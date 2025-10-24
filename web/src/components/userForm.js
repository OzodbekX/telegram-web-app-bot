import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Button, Form, Input, Select, Spin } from "antd";
import { getBillingCities, getBillingRegions, postLeadNote } from "../api/helpers";
import { useTranslation } from "react-i18next";
import "./userForm.scss";
import PhoneNumberInput from "./PhoneNumberInput";
import LanguageSwitcher from "./LanguageSwitcher";
const { Option } = Select;
export default function FormPage() {
    const { i18n, t } = useTranslation();
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [loadingCities, setLoadingCities] = useState(true);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        import("@twa-dev/sdk").then(({ default: WebApp }) => {
            try {
                const user = WebApp.initDataUnsafe?.user;
                if (user) {
                    setUserData(user);
                }
            }
            catch (err) {
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
    const handleCityChange = (value) => {
        setSelectedCity(value);
        form.setFieldsValue({ district: undefined }); // clear district
    };
    const onFinish = async (values) => {
        setIsSubmitting(true);
        try {
            // 🧩 Detect Telegram WebApp user (if available)
            const tg = window.Telegram?.WebApp;
            const telegramUser = tg?.initDataUnsafe?.user;
            // 🧪 Test data fallback for local dev (non-Telegram environment)
            const testData = {
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
            }
            else {
                throw new Error("Server returned null");
            }
        }
        catch (error) {
            console.error("❌ Error submitting lead note:", error);
            // alert(t('failedToSendData'));
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsx("div", { className: "ant-form-page", children: _jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("h4", { children: t("title") }), _jsx(LanguageSwitcher, {})] }), _jsx("div", { className: "card-body", children: success ? (_jsx("div", { className: "success-alert", children: _jsx("p", { className: "success-text", children: t("applicationSentSuccessfully") }) })) : (_jsxs(Form, { form: form, layout: "vertical", onFinish: onFinish, requiredMark: false, children: [_jsx(Form.Item, { name: "city", label: t("city"), rules: [{ required: true, message: t("cityRequired") }], children: _jsx(Select, { placeholder: t("cityPlaceholder"), onChange: handleCityChange, size: "large", allowClear: true, loading: loadingCities, children: cities.map((city) => (_jsx(Option, { value: city.id, children: city.name }, city.id))) }) }), _jsx(Form.Item, { name: "district", label: t("district"), rules: [{ required: true, message: t("districtRequired") }], children: _jsx(Select, { placeholder: t("districtPlaceholder"), size: "large", allowClear: true, disabled: !selectedCity || loadingDistricts, notFoundContent: loadingDistricts ? _jsx(Spin, { size: "small" }) : null, children: districts.map((d) => (_jsx(Option, { value: d.id, children: d.name }, d.id))) }) }), _jsx(Form.Item, { name: "fullName", label: t("name"), rules: [{ required: true, message: t("nameRequired") }, { min: 4, message: t("nameMin") }, // 👈 added minimum 4 characters
                                ], children: _jsx(Input, { size: "large", placeholder: t("namePlaceholder") }) }), _jsx(PhoneNumberInput, { rules: [{ required: true, message: t('pleaseEnterYourPhoneNumber') }], label: t('phone'), form: form, name: 'phone', placeholder: t('phone') }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", size: "large", htmlType: "submit", block: true, loading: isSubmitting, children: t("submit") }) })] })) }), _jsx("div", { className: "card-footer", children: _jsx("small", { children: t("footerNote") }) })] }) }));
}
