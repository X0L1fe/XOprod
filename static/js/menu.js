const { useState, useEffect } = React;

const Sidebar = () => {
  const [isShrinkView, setIsShrinkView] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // По умолчанию тёмная тема, если в localStorage нет значения
    return localStorage.getItem('theme') !== 'light';
  });

  // Применяем тему при загрузке компонента и при изменении isDarkMode
  useEffect(() => {
    applyTheme(isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleSidebarView = () => {
    setIsShrinkView(!isShrinkView);
  };

  // Функция для применения темы
  const applyTheme = (isDark) => {
    const sidebarRoot = document.querySelector('.sidebar-root');
    const nicepageElements = document.querySelectorAll('.u-black, .u-body.u-black');

    if (isDark) {
      sidebarRoot.classList.remove("white");
      nicepageElements.forEach(element => element.classList.remove("white"));
    } else {
      sidebarRoot.classList.add("white");
      nicepageElements.forEach(element => element.classList.add("white"));
    }
  };

  const handleThemeChange = () => {
    const newDarkMode = !isDarkMode; // Инвертируем текущую тему
    setIsDarkMode(newDarkMode); // Обновляем состояние
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: `sidebar-container${isShrinkView ? " shrink" : ""}` }, /*#__PURE__*/
    React.createElement("button", {
      className: "sidebar-viewButton",
      type: "button",
      "aria-label": isShrinkView ? "Expand Sidebar" : "Shrink Sidebar",
      title: isShrinkView ? "Expand" : "Shrink",
      onClick: handleSidebarView }, /*#__PURE__*/

    React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      class: "feather feather-chevron-left" }, /*#__PURE__*/

    React.createElement("polyline", { points: "15 18 9 12 15 6" }))), /*#__PURE__*/


    React.createElement("div", { className: "sidebar-wrapper" }, /*#__PURE__*/
    React.createElement("div", { className: "sidebar-themeContainer" }, /*#__PURE__*/
    React.createElement("label", {
      labelFor: "theme-toggle",
      className: `sidebar-themeLabel${isDarkMode ? " switched" : ""}` }, /*#__PURE__*/

    React.createElement("input", {
      className: "sidebar-themeInput",
      type: "checkbox",
      id: "theme-toggle",
      onChange: handleThemeChange,
      checked: !isDarkMode
     }), /*#__PURE__*/

    //ff
    React.createElement("div", { className: "sidebar-themeType light" }, /*#__PURE__*/
    React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 22 22",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      className: "sidebar-listIcon" }, /*#__PURE__*/

    React.createElement("circle", { cx: "12", cy: "12", r: "5" }), /*#__PURE__*/  
    React.createElement("path", { d: "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" })), /*#__PURE__*/
    
    
    React.createElement("span", { className: "sidebar-themeInputText" }, "Свет")), /*#__PURE__*/

    React.createElement("div", { className: "sidebar-themeType dark" }, /*#__PURE__*/
    React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 23 23",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      className: "sidebar-listIcon" }, /*#__PURE__*/

    React.createElement("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })), /*#__PURE__*/

    
    React.createElement("span", { className: "sidebar-themeInputText" }, "Тьма")))), /*#__PURE__*/



    React.createElement("ul", { className: "sidebar-list" }, /*#__PURE__*/
    React.createElement("li", { className: "sidebar-listItem active" }, /*#__PURE__*/
    React.createElement("a", { href: "/"}, /*#__PURE__*/
      React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        className: "sidebar-listIcon"
      }, /*#__PURE__*/
    React.createElement("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }), /*#__PURE__*/
    React.createElement("polyline", { points: "9 22 9 12 15 12 15 22" })),
    React.createElement("span", { className: "sidebar-listItemText" }, "Главная"))), /*#__PURE__*/


    React.createElement("li", { className: "sidebar-listItem" }, /*#__PURE__*/
    React.createElement("a", { href: "/about"}, /*#__PURE__*/
    React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        className: "sidebar-listIcon"
      }, /*#__PURE__*/
    React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /*#__PURE__*/
    React.createElement("line", { x1: "12", y1: "16", x2: "12", y2: "12" }), /*#__PURE__*/
    React.createElement("line", { x1: "12", y1: "8", x2: "12", y2: "8" })),
    React.createElement("span", { className: "sidebar-listItemText" }, "Обо мне"))), /*#__PURE__*/


    React.createElement("li", { className: "sidebar-listItem" }, /*#__PURE__*/
    React.createElement("a", { href: "/projects"}, /*#__PURE__*/
    React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        className: "sidebar-listIcon"
      }, /*#__PURE__*/
    React.createElement("path", { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" })),
    React.createElement("span", { className: "sidebar-listItemText" }, "Проекты"))), /*#__PURE__*/


    React.createElement("li", { className: "sidebar-listItem" }, /*#__PURE__*/
    React.createElement("a", { href: "/contacts"}, /*#__PURE__*/
    React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      className: "sidebar-listIcon" }, /*#__PURE__*/

    React.createElement("polyline", { points: "22 12 18 12 15 21 9 3 6 12 2 12" })), /*#__PURE__*/

    React.createElement("span", { className: "sidebar-listItemText" }, "Контакты"))), /*#__PURE__*/


    React.createElement("li", { className: "sidebar-listItem" }, /*#__PURE__*/
    React.createElement("a", null, /*#__PURE__*/
    React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        className: "sidebar-listIcon"
      }, /*#__PURE__*/
    React.createElement("path", { d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" })),
    React.createElement("span", { className: "sidebar-listItemText" }, "GitHub"))))))); /*#__PURE__*/




};

ReactDOM.render( /*#__PURE__*/React.createElement(Sidebar, null), document.getElementById("root"));