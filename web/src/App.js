import { jsx as _jsx } from "react/jsx-runtime";
import FormPage from "./components/userForm";
import "./App.css";
function App() {
    return (_jsx("div", { className: "main", children: _jsx(FormPage, {}) }));
}
export default App;
