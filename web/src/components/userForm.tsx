import { useEffect, useState } from "react";
import {  Button, Form, Input, Select, Spin } from "antd";
import { getBillingCities, getBillingRegions, postLeadNote, PostLeadNoteParams } from "../api/helpers";
import { useTranslation } from "react-i18next";
import PhoneNumberInput from "./PhoneNumberInput";
import LanguageSwitcher from "./LanguageSwitcher";
import "./userForm.scss";

const { Option } = Select;

type City = { id: string; name: string };
type District = { id: string; name: string };

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
  allows_write_to_pm?: boolean;
  photo_url?: string;
}

export default function FormPage() {
  const { i18n, t } = useTranslation();

  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [loadingCities, setLoadingCities] = useState(true);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    import("@twa-dev/sdk").then(({ default: WebApp }) => {
      try {
        const user = WebApp.initDataUnsafe?.user;
        if (user) {
          setUserData(user as UserData);
        }
      } catch (err) {
        console.error("Telegram WebApp SDK error:", err);
      }
    });
  }, []);

  useEffect(() => {
    getBillingCities().then(setCities).finally(() => setLoadingCities(false));
  }, []);

  useEffect(() => {
    if (selectedCity) {
      setLoadingDistricts(true);
      getBillingRegions(selectedCity)
        .then(setDistricts)
        .finally(() => setLoadingDistricts(false));
    }
  }, [selectedCity]);

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    form.setFieldsValue({ district: undefined }); // clear district
  };

  const onFinish = async (values: any) => {
    setIsSubmitting(true);

    try {
      // 🧩 Detect Telegram WebApp user (if available)
      const tg = window.Telegram?.WebApp;
      const telegramUser = tg?.initDataUnsafe?.user;


      // 🧪 Test data fallback for local dev (non-Telegram environment)
      const testData: PostLeadNoteParams = {
        cityId: values.city,
        cityName: cities.find(c => c.id === values.city)?.name || "",
        districtId: values.district,
        districtName: districts.find(d => d.id === values.district)?.name || "",
        fullName: values.fullName,
        telegramPhoneNumber: values.phone?.startsWith("+") ? values.phone : `+${values.phone}`,
        preferredLanguage: i18n.language,
        telegramId: telegramUser?.id,
      };
      console.log(testData);
      if (userData) {
        testData.telegramId = userData.id;
        testData.telegramUsername = userData.username;
      }


      // 🧾 Send to backend
      const response = await postLeadNote(testData);

      if (response) {
        setSuccess(true);
        // Optional Telegram success message
        tg?.HapticFeedback?.notificationOccurred("success");

        // Redirect after short delay
        setTimeout(() => {
          window.location.href = "https://t.me/TuronTelecomSales";
        }, 2000);
      } else {
        throw new Error("Server returned null");
      }
    } catch (error) {
      console.error("❌ Error submitting lead note:", error);
      // alert(t('failedToSendData'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ant-form-page">
      <div className="card">
        <div className="card-header">
          <h4>{t("title")}</h4>
          <LanguageSwitcher />

        </div>

        <div className="card-body">
          {success ? (
            <div className="success-alert">
              <p className="success-text">{t("applicationSentSuccessfully")}</p>
            </div>
          ) : (
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
            >
              <Form.Item
                name="city"
                label={t("city")}
                rules={[{ required: true, message: t("cityRequired") }]}
              >
                <Select
                  placeholder={t("cityPlaceholder")}
                  onChange={handleCityChange}
                  size="large"
                  allowClear
                  loading={loadingCities}
                >
                  {cities.map((city) => (
                    <Option value={city.id} key={city.id}>
                      {city.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="district"
                label={t("district")}
                rules={[{ required: true, message: t("districtRequired") }]}
              >
                <Select
                  placeholder={t("districtPlaceholder")}
                  size="large"
                  allowClear
                  disabled={!selectedCity || loadingDistricts}
                  notFoundContent={
                    loadingDistricts ? <Spin size="small" /> : null
                  }
                >
                  {districts.map((d) => (
                    <Option value={d.id} key={d.id}>
                      {d.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="fullName"
                label={t("name")}
                rules={[{ required: true, message: t("nameRequired") }, { min: 4, message: t("nameMin") }, // 👈 added minimum 4 characters
                ]}
              >
                <Input size="large" placeholder={t("namePlaceholder")} />
              </Form.Item>
              <PhoneNumberInput rules={[{ required: true, message: t('pleaseEnterYourPhoneNumber') }]} label={t('phone')} form={form} name={'phone'} placeholder={t('phone')} />

              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  block
                  loading={isSubmitting}
                >
                  {t("submit")}
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>

        <div className="card-footer">
          <small>{t("footerNote")}</small>
        </div>
      </div>
    </div>
  );
}
