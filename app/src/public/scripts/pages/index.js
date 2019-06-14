const path = location.pathname;

switch (path) {
  case '/':
    // "/* webpackChunkName: "home" */ " позволяет не загружать все скрипты сразу,
    //  а разделить код на куски и загружать их по мере необходимости.
    //  Это ускоряет загрузку сайта и уменьшает количество потребляемого трафика
    //  https://webpack.js.org/guides/code-splitting/
    import(/* webpackChunkName: "home" */ './home');
    break;
}
