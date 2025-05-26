import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appCopyClipboard]',
})
export class CopyClipboardDirective {
  @Output() copiedEvent = new EventEmitter<{
    icon: string;
    pTooltip: string;
  }>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('click')
  onClick(){
    let textToCopy = '';
    const targetElementId = this.elementRef.nativeElement.getAttribute('targetElementId');
    if(targetElementId){
        const targetElement = document.getElementById(targetElementId);
        if (targetElement) {
        textToCopy = targetElement.innerText;
      } else {
        // console.log('Target element not found with id::: ', targetElementId);
        return;
      }
    }
    this.copiedEvent.emit({icon: "pi pi-check", pTooltip: "Successfully Copied"});

    // Below list will create a textarea where the above copied text will be inserted into the textarea element.
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    // Below line to execute the document comment of copy.
    document.execCommand('copy');
    document.body.removeChild(textarea);

    setTimeout(() => {
        this.copiedEvent.emit({icon: "pi pi-copy", pTooltip: "Copy to clipboard"});
    }, 2000);
  }
}
