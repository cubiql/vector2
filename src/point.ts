export interface PointLike {
    x: number;
    y: number;
}

export class Point implements PointLike {
    protected _x!: number;
    protected _y!: number;

    public get x() {
        return this._x;
    }

    public set x(num: number) {
        this._x = num;
    }

    public get y() {
        return this._y;
    }

    public set y(num: number) {
        this._y = num;
    }

    constructor(x?: number, y?: number);
    constructor(vector: PointLike);

    constructor(x: number | PointLike = 0, y: number = 0) {
        if (typeof x === 'number') {
            this.x = x;
            this.y = y;
        } else {
            this.x = x.x;
            this.y = x.y;
        }
    }

    public add(num: number): this;
    public add(vector: PointLike): this;

    public add(vector: number | PointLike) {
        if (typeof vector === 'number') {
            this.x += vector;
            this.y += vector;
        } else {
            this.x += vector.x;
            this.y += vector.y;
        }

        return this;
    }

    public sub(num: number): this;
    public sub(vector: PointLike): this;

    public sub(vector: number | PointLike) {
        if (typeof vector === 'number') {
            this.x -= vector;
            this.y -= vector;
        } else {
            this.x -= vector.x;
            this.y -= vector.y;
        }

        return this;
    }

    public get mag(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public mult(num: number): this;
    public mult(vector: PointLike): this;

    public mult(num: number | PointLike) {
        if (typeof num === 'number') {
            this.x *= num;
            this.y *= num;
        } else {
            this.x *= num.x;
            this.y *= num.y;
        }

        return this;
    }

    public div(num: number): this;
    public div(vector: PointLike): this;

    public div(num: number | PointLike) {
        if (typeof num === 'number') {
            this.x /= num;
            this.y /= num;
        } else {
            this.x /= num.x;
            this.y /= num.y;
        }

        return this;
    }

    public normalize() {
        const mag = this.mag;

        if (mag !== 0) {
            this.div(mag);
        }

        return this;
    }

    public dot(vector: PointLike): number {
        return this.x * vector.x + this.y * vector.y;
    }

    public addAngle(angle: number) {
        this.mult({x: Math.cos(angle), y: Math.sin(angle)});

        return this;
    }

    public rotate(angle: number) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const x = this.x * cos - this.y * sin;
        const y = this.x * sin + this.y * cos;

        this.x = x;
        this.y = y;

        return this;
    }

    public angleBetween(vector: PointLike): number {
        const dot = this.dot(vector);
        const mags = this.mag * new Point(vector).mag;

        if (mags === 0) return 0;

        return Math.acos(dot / mags);
    }

    public angle(vector: PointLike = new Point()): number {
        return Math.atan2(this.y - vector.y, this.x - vector.x);
    }

    public limit(max: number) {
        if (this.mag > max) {
            this.normalize();
            this.mult(max);
        }

        return this;
    }

    public setMag(newMag: number) {
        this.normalize();
        this.mult(newMag);

        return this;
    }

    public clone(): Point {
        return new Point(this);
    }

    public copy(vector: PointLike): Point {
        this.x = vector.x;
        this.y = vector.y;

        return this;
    }

    static toCartesian(r: number, theta: number): Point {
        return new Point(r * Math.cos(theta), r * Math.sin(theta));
    }

    static addAngle(v: PointLike, angle: number) {
        return new Point(v.x * Math.cos(angle), v.y * Math.sin(angle));
    }

    static distance(a: PointLike, b: PointLike): number {
        return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    }

    static add(a: PointLike, b: PointLike): Point {
        return new Point(a.x + b.x, a.y + b.y);
    }

    static sub(a: PointLike, b: PointLike): Point {
        return new Point(a.x - b.x, a.y - b.y);
    }

    static mult(v: PointLike, num: number) {
        return new Point(v.x * num, v.y * num);
    }

    static div(v: PointLike, num: number) {
        return new Point(v.x / num, v.y / num);
    }

    static dot(a: PointLike, b: PointLike): number {
        return a.x * b.x + a.y * b.y;
    }

    static mag(v: PointLike): number {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    static lerp(a: PointLike, b: PointLike, factor: number): Point {
        return new Point(a.x + (b.x - a.x) * factor, a.y + (b.y - a.y) * factor);
    }
}
