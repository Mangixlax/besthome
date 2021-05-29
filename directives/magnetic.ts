import { VNode } from 'vue'
import { DirectiveBinding, DirectiveOptions } from 'vue/types/options'
import $ from 'jquery'
import { gsap } from 'gsap'

interface IHTMLElementMagnetic extends HTMLElement {
  magnetic: any
}

interface IMagneticOptions {
  y: number
  x: number
  s: number
  rs: number
}

class MagneticModule {
  public y: number = 0
  public x: number = 0
  public width: number = 0
  public height: number = 0

  public defaultOptions: IMagneticOptions = { y: 0.2, x: 0.2, s: 0.15, rs: 0.5 }
  public options: IMagneticOptions = this.defaultOptions

  public $el: HTMLElement | VNode | JQuery

  constructor($el: HTMLElement | VNode | JQuery, newOptions?: IMagneticOptions) {
    this.$el = $el
    this.options = {
      ...this.defaultOptions,
      ...(newOptions ? newOptions : {}),
    }
  }

  bind() {
    $(this.$el)
      .on('mouseenter', this.onMouseEnter.bind(this))
      .on('mousemove', this.onMouseMove.bind(this))
      .on('mouseleave', this.onMouseLeave.bind(this))
  }

  unbind() {
    $(this.$el)
      .off('mouseenter', this.onMouseEnter.bind(this))
      .off('mousemove', this.onMouseMove.bind(this))
      .off('mouseleave', this.onMouseLeave.bind(this))
  }

  onMouseEnter() {
    this.y = ($(this.$el) as any).offset().top - window.scrollY
    this.x = ($(this.$el) as any).offset().left - window.scrollX
    this.width = $(this.$el).outerWidth() as number
    this.height = $(this.$el).outerHeight() as number
  }

  onMouseMove(e: any) {
    let n = (e.clientY - this.y - this.height / 2) * this.options.y
    let i = (e.clientX - this.x - this.width / 2) * this.options.x
    this.move(i, n, this.options.s)
  }

  onMouseLeave() {
    this.move(0, 0, this.options.rs)
  }

  move(x: number, y: number, duration: number) {
    gsap.to(this.$el, { y: y, x: x, force3D: !0, overwrite: !0, duration: duration })
  }
}

const Magnetic: DirectiveOptions = {
  bind(el: HTMLElement, bind: DirectiveBinding) {
    ;(el as IHTMLElementMagnetic).magnetic = new MagneticModule(el, bind.value || {})
    ;(el as IHTMLElementMagnetic).magnetic.bind()
  },
  unbind(el: HTMLElement) {
    if ((el as IHTMLElementMagnetic).magnetic) {
      ;(el as IHTMLElementMagnetic).magnetic.unbind()
    }
  },
}

export default Magnetic
