import FormPage from "./components/userForm";
import LanguageSwitcher from "./components/LanguageSwitcher";
import "./App.css";

function App() {

  return (
    <div  className="main">
      <LanguageSwitcher />
      <FormPage />
    </div>
  );
}

export default App;
