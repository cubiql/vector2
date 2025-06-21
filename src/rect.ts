import type {PointLike} from './point';

export interface Rectangle {
    position: PointLike;
    size: PointLike | null;
}
