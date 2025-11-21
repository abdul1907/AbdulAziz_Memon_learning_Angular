import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightOnFocus]',
  standalone: true,
})
export class HighlightOnFocus {

  @Input() appHighlightOnFocus = '';
  
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('focus') onFocus() {
    this.highlight(this.appHighlightOnFocus || 'lightyellow')
  }

  @HostListener('blur') onBlur() {
    this.highlight('');
  }

  private highlight(color: string) {
    if(color) {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
    }
  }
}
