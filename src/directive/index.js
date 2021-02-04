export function directive(Vue, roles) {
  Vue.directive("permit", {
    inserted: function(el, binding) {
      !roles.includes(binding.value) ? el.parentNode.removeChild(el) : {};
    }
  });
}
