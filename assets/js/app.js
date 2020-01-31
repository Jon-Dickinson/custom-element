// custom element
class LiveTimer extends HTMLElement {
  
  render() {
    this.innerHTML = `
    <time-formatted>
      <visible-time id="cloneTimeA"> </visible-time>
    </time-formatted>
    `;

    this.timerElem = this.firstElementChild;
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
    this.timer = setInterval(() => this.update(), 1000);
  }

  update() {
    this.date = new Date();
    this.timerElem.setAttribute("value", this.date);
    this.cloneTimeA = document.getElementById("cloneTimeA");
    this.cloneTimeA.innerHTML = this.date.toLocaleTimeString();
    this.dispatchEvent(new CustomEvent("tick", { detail: this.date }));
  }

  disconnectedCallback() {
    clearInterval(this.timer); // element garbage collection
  }
}
customElements.define("live-timer", LiveTimer);


// canvas clock
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
    ctx.lineWidth = 20;
    ctx.shadowBlur = 2;

function degToRad(degree) {
  let factor = Math.PI / 180;
  return degree * factor;
}

function renderTime() {

  let now = new Date();
  let hrs = now.getHours();
  let min = now.getMinutes();
  let sec = now.getSeconds();
  let mil = now.getMilliseconds();
  let smoothsec = sec + mil / 1000;
  let smoothmin = min + smoothsec / 60;

  // background
  ctx.fillStyle = "#37474f";
  
  // size
  ctx.fillRect(0, 0, 220, 220);

  // hours
  ctx.beginPath();
  ctx.arc(110, 110, 70, degToRad(270), degToRad(hrs * 30 - 90));
  ctx.strokeStyle = "#f50057";
  ctx.shadowColor = "#f50057";
  ctx.stroke();

  // minutes
  ctx.beginPath();
  ctx.arc(110, 110, 50, degToRad(270), degToRad(smoothmin * 6 - 90));
  ctx.strokeStyle = "#ffd600";
  ctx.shadowColor = "#ffd600";
  ctx.stroke();

  // seconds
  ctx.beginPath();
  ctx.arc(110, 110, 30, degToRad(270), degToRad(smoothsec * 6 - 90));
  ctx.strokeStyle = "#2979ff";
  ctx.shadowColor = "#2979ff";
  ctx.stroke();

}
setInterval(renderTime, 30);
