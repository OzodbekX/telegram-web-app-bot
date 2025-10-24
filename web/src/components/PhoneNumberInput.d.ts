import { FC, ReactNode } from 'react';
import { FormInstance } from 'antd';
export type IconProps = {
    size?: number;
    height?: number;
    width?: number;
    bgColor?: string;
    className?: string;
    dataTestid?: string;
    color?: string;
    onClick?: () => void;
};
import './PhoneNumberInput.scss';
type TProps = {
    form?: FormInstance;
    label?: string;
    width?: number | string;
    name?: string;
    className?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    placeholder?: string;
    addonBefore?: ReactNode;
    autoFocus?: boolean;
    hideIcon?: boolean;
    rules?: {
        required?: boolean;
        message?: string;
    }[];
};
declare const PhoneNumberInput: FC<TProps>;
export default PhoneNumberInput;
