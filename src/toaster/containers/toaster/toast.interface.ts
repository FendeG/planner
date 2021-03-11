// export type ToastType = 'warning' | 'info' | 'success' | 'error';

// export interface ToastData {
//     message: string;
//     type: ToastType;

// }

export class Alert {
    id: string;
    type: AlertType;
    message: string;
    autoClose: boolean;
    keepAfterRouteChange: boolean;
    fade: boolean;
    timeOut: number;

    constructor(init?: Partial<Alert>) {
        this.timeOut = 3000;
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}
