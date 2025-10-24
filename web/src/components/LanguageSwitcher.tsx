import { useTranslation } from "react-i18next";
import { Select } from "antd";
import "./languageSwitcher.scss";

const { Option } = Select;

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLang = i18n.language || "uz";

  return (
    <div className="language-switcher">
      <Select
        defaultValue={currentLang}
        style={{ width: 70 ,padding: "2px"}}
        size="large"
        onChange={changeLanguage}
      >
        {/* <Option value="en">En</Option> */}
        <Option value="ru">Ру</Option>
        <Option value="uz">Uz</Option>
      </Select>
    </div>
  );
}
