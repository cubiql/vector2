import type {Rectangle} from './rect';
import type {PointLike} from './point';

export class AABB {
    static isOverlap(a: Rectangle, b: Rectangle): boolean {
        if (!a.size || !b.size) return false;

        return !(
            a.position.x + a.size.x < b.position.x ||
            a.position.x > b.position.x + b.size.x ||
            a.position.y + a.size.y < b.position.y ||
            a.position.y > b.position.y + b.size.y
        );
    }

    static expand(rect: Rectangle, margin: number): Rectangle {
        if (!rect.size) return rect;

        return {
            position: {
                x: rect.position.x - margin,
                y: rect.position.y - margin,
            },
            size: {
                x: rect.size.x + margin * 2,
                y: rect.size.y + margin * 2,
            },
        };
    }

    static contains(rect: Rectangle, point: PointLike): boolean {
        if (!rect.size) return false;

        return point.x >= rect.position.x && point.x <= rect.position.x + rect.size.x && point.y >= rect.position.y && point.y <= rect.position.y + rect.size.y;
    }

    static getIntersection(a: Rectangle, b: Rectangle): Rectangle | null {
        if (!a.size || !b.size) return null;

        const x1 = Math.max(a.position.x, b.position.x);
        const y1 = Math.max(a.position.y, b.position.y);
        const x2 = Math.min(a.position.x + a.size.x, b.position.x + b.size.x);
        const y2 = Math.min(a.position.y + a.size.y, b.position.y + b.size.y);

        if (x2 <= x1 || y2 <= y1) return null;

        return {
            position: {x: x1, y: y1},
            size: {x: x2 - x1, y: y2 - y1},
        };
    }

    static getCenter(rect: Rectangle): PointLike {
        if (!rect.size) return rect.position;

        return {
            x: rect.position.x + rect.size.x / 2,
            y: rect.position.y + rect.size.y / 2,
        };
    }
}
