import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h4>
      Copy Button Demo
    </h4>

    <input
      #couponCodeInput
      type="text"
      [ngModel]="couponCode"
      aria-label="Coupon Code"
      readonly
    />
    <button type="button" (click)="copy()">COPY</button>

    <div style="margin-top: 0.5rem;">
      <p>{{ tooltipText }}</p>
      <input
        type="text"
        placeholder="you can paste it here"
        [hidden]="!tooltipText"
      />
    </div>
  `
})
export class AppComponent implements OnInit {
  couponCode = '';
  tooltipText = '';
  @ViewChild('couponCodeInput', { static: true })
  inputEl: ElementRef;

  ngOnInit() {
    this.couponCode = 'MyCouponCode';
  }

  copy() {
    try {
      if ((navigator as any).clipboard) {
        (navigator as any).clipboard.writeText(this.couponCode);
      } else if ((window as any).clipboardData) {
        (window as any).clipboardData.setData('text', this.couponCode);
      } else {
        this.copyToClipboard(this.inputEl.nativeElement);
      }
      this.tooltipText = 'Copied to Clipboard.';
    } catch (e) {
      this.tooltipText = 'Please copy coupon manually.';
    }
  }

  private copyToClipboard(el: HTMLInputElement) {
    const oldContentEditable = el.contentEditable;
    const oldReadOnly = el.readOnly;

    try {
      el.contentEditable = 'true';
      el.readOnly = false;
      this.copyNodeContentsToClipboard(el);
    } finally {
      el.contentEditable = oldContentEditable;
      el.readOnly = oldReadOnly;
    }
  }

  private copyNodeContentsToClipboard(el: HTMLInputElement) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(el);
    selection.removeAllRanges();

    selection.addRange(range);
    el.setSelectionRange(0, 999999);

    document.execCommand('copy');
  }
}
