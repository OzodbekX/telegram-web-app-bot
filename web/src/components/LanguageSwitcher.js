import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import "./languageSwitcher.scss";
const { Option } = Select;
export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    const currentLang = i18n.language || "uz";
    return (_jsx("div", { className: "language-switcher", children: _jsxs(Select, { defaultValue: currentLang, style: { width: 70, padding: "2px" }, size: "large", onChange: changeLanguage, children: [_jsx(Option, { value: "ru", children: "\u0420\u0443" }), _jsx(Option, { value: "uz", children: "Uz" })] }) }));
}
