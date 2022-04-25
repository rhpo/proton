export var SCREENJS = {}
SCREENJS.Animations = { Fade: 'fade', None: 'none', FlipX: 'flipx', FlipY: 'flipy', SwipeLeft: 'swipeleft' }
SCREENJS.ScreenCollection = []
var currentZINDEX = 0;

export class Screen {
    constructor(root, animation, animationDuration, opacity, background) {
        this.root = root;
        this.animation = animation;
        this.opacity = opacity;
        this.background = background;
        this.animationDuration = animationDuration;
    }

    Set(prop, val) {
        this[prop] = val;
        return this
    }

    CSS(prop, val) {
        if (!this.ScreenHTMLElement) {
            throw new ReferenceError('This Screen object has not been Initialized yet... Please use \'*.Init()\'')
        }
        this.HTMLElement.style[prop] = val;
        return this
    }

    Init() {
        var screen = document.createElement('div')
        screen.style.left = '0'
        screen.style.top = '0'
        screen.style.bottom = '0'
        screen.style.right = '0'
        screen.style.width = 'moz-available'
        screen.style.height = 'moz-available'
        screen.style.position = 'fixed'
        screen.style.background = this.background || 'white';
        screen.style.zIndex = 999999999 + currentZINDEX;
        screen.style.visibility = 'hidden'
        screen.style.opacity = '0'
        screen.style.transition = 'all ' + ((this.animationDuration || 200) + 'ms');
        screen.innerHTML = this.root || '';
        document.body.appendChild(screen)
        this.ScreenHTMLElement = screen;
        SCREENJS.ScreenCollection.push(this)
        this.HTMLElement = screen;
        return this
    }

    async Show() {
        if (!this.ScreenHTMLElement) {
            throw new ReferenceError('This Screen object has not been Initialized yet... Please use \'*.Init()\'')
        } else switch (this.animation || 'fade') {
            case 'fade':
                await this.ScreenHTMLElement.animate([
                    { opacity: 0 },
                    { opacity: this.opacity || 1 }
                ], this.animationDuration || 400);
                this.HTMLElement.style.visibility = 'visible'
                this.HTMLElement.style.opacity = this.opacity || 1;
                break;

            case 'flipx':
                await this.ScreenHTMLElement.animate([
                    { transform: 'rotateX(90deg)' },
                    { transform: 'rotateX(0deg)' }
                ], this.animationDuration || 400);

                this.HTMLElement.style.opacity = this.opacity || 1;
                this.HTMLElement.style.visibility = 'visible'
                break;

            case 'flipy':
                await this.ScreenHTMLElement.animate([
                    { transform: 'rotateY(90deg)' },
                    { transform: 'rotateY(0deg)' }
                ], this.animationDuration || 400);

                this.HTMLElement.style.opacity = this.opacity || 1;
                this.HTMLElement.style.visibility = 'visible'
                break;

            case 'none':
                await this.HTMLElement.animate([
                    { opacity: 0 },
                    { opacity: this.opacity || 1 }
                ], 0);
                this.HTMLElement.style.opacity = this.opacity || 1;
                this.HTMLElement.style.visibility = 'visible'
                break;
            default:
                throw new ReferenceError('Animation not Found/Supported.')
        }
        return this
    }

    async Hide() {
        if (!this.ScreenHTMLElement) {
            throw new ReferenceError('This Screen object has not been Initialized yet... Please use \'*.Init()\'')
        } else switch (this.animation) {
            case 'fade':
                await this.ScreenHTMLElement.animate([
                    { opacity: this.opacity || 1 },
                    { opacity: 0 }
                ], this.animationDuration || 400);

                this.ScreenHTMLElement.style.visibility = 'hidden'
                break;

            case 'flipx':
                await this.ScreenHTMLElement.animate([
                    { transform: 'rotateX(0deg)' },
                    { transform: 'rotateX(90deg)' }
                ], this.animationDuration || 400);

                this.ScreenHTMLElement.style.visibility = 'hidden'
                break;

            case 'flipy':
                await this.ScreenHTMLElement.animate([
                    { transform: 'rotateY(0deg)' },
                    { transform: 'rotateY(90deg)' }
                ], this.animationDuration || 400);

                this.ScreenHTMLElement.style.visibility = 'hidden'
                break;

            case 'none':
                await this.HTMLElement.animate([
                    { opacity: this.opacity },
                    { opacity: 0 }
                ], 0);
                this.HTMLElement.style.opacity = '0';
                this.ScreenHTMLElement.style.visibility = 'hidden'
                break;

            default:
                throw new ReferenceError('Animation not Found/Supported.')
        }
        return this
    }
}



export function InitAlert(header, message) {
    var alert = new Screen();
    alert.Set('animation', 'fade').Set('opacity', '1').Set('background', 'rgb(0, 0, 0, 0.8)').Init();
    alert.CSS('display', 'flex');
    alert.CSS('flex-direction', 'column');
    alert.CSS('justify-content', 'center');
    alert.CSS('align-items', 'center');

    var alertbox = document.createElement('div');
    alertbox.style.width = '60%';
    alertbox.style.height = 'fit-content';
    alertbox.style.background = 'var(--background-color)';
    alertbox.style.borderRadius = '5px';
    alertbox.style.border = '1px solid var(--color-2)';
    alertbox.innerHTML = `
        <h3 style="border-bottom: 1px solid var(--color-2); padding: 10px;padding-left: 15px; padding-right: 15px; display: flex; justify-content: space-between; align-items: center;">${header} <span style="text-align: right; cursor: pointer;" onclick="incorrectAlert.Hide()">✕</span></h3>
        <p style="padding: 15px; color: var(--color-1); font-size: 15px;">${message}</p>
    `

    alert.HTMLElement.appendChild(alertbox);

    return alert;
}
