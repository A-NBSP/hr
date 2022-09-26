export const imgerror = {
  inserted(el, binding, vnode) {
    console.log(el)
    console.log(binding)
    console.log(vnode)
    el.error = function() {
      el.src = binding.value
    }
  }
}
