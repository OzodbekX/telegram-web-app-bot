'use client';

import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';

import { Form, FormInstance, Input, InputRef } from 'antd';
export type IconProps = {
  size?: number
  height?: number
  width?: number
  bgColor?: string
  className?: string
  dataTestid?: string
  color?: string
  onClick?: () => void
}
const IconCallCalling: FC<IconProps> = ({ size = 24, className, color = 'white', onClick, height, width }) => {
  return (
    <svg width={width || size} onClick={onClick} className={className} height={height || size} viewBox="0 0 19 19" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.8333 18.7497C12.8105 18.7298 11.8019 18.506 10.8666 18.0914C9.81094 17.6329 8.81021 17.0571 7.88331 16.3747C6.88831 15.6463 5.94954 14.8441 5.07497 13.9747C4.20769 13.1036 3.40815 12.1675 2.68331 11.1747C2.0209 10.2498 1.462 9.25495 1.01664 8.20807C0.603667 7.27263 0.382637 6.26382 0.366639 5.2414C0.363498 4.61147 0.479423 3.98662 0.708309 3.39974C0.941364 2.78245 1.30852 2.22459 1.7833 1.76641C2.06356 1.47248 2.3994 1.23714 2.77134 1.07406C3.14328 0.910979 3.54391 0.8234 3.94998 0.816406C4.27523 0.816971 4.59649 0.888048 4.89163 1.02474C5.22658 1.1682 5.51508 1.40188 5.72497 1.69974L7.65831 4.42474C7.82435 4.64082 7.95901 4.87929 8.0583 5.13307C8.16483 5.36601 8.22159 5.61862 8.22497 5.87474C8.22188 6.19898 8.12963 6.51611 7.95831 6.7914C7.80515 7.05172 7.61732 7.29001 7.39997 7.49974L6.8333 8.09141V8.14974C7.03371 8.47477 7.26238 8.78151 7.51664 9.0664C7.88331 9.4914 8.27496 9.89974 8.69163 10.3497C9.1083 10.7997 9.59164 11.1831 9.97497 11.5414C10.2732 11.8037 10.5971 12.0355 10.9416 12.2331L11.5166 11.6664C11.7359 11.4353 11.9887 11.2387 12.2666 11.0831C12.5115 10.9419 12.786 10.86 13.0682 10.8441C13.3505 10.8282 13.6325 10.8786 13.8916 10.9914C14.1374 11.0983 14.3719 11.2295 14.5916 11.3831L17.3583 13.3497C17.66 13.5534 17.8926 13.844 18.025 14.1831C18.1604 14.4702 18.2342 14.7824 18.2416 15.0997C18.2396 15.5062 18.1486 15.9072 17.975 16.2747C17.801 16.6398 17.5735 16.9769 17.3 17.2747C16.8649 17.7734 16.3201 18.1642 15.7083 18.4164C15.1121 18.6525 14.4744 18.7659 13.8333 18.7497ZM3.94998 2.08307C3.70438 2.09215 3.46302 2.14986 3.23987 2.25285C3.01672 2.35584 2.81621 2.50207 2.64996 2.68307C2.28842 3.00804 2.00376 3.40941 1.81663 3.85807C1.64078 4.29782 1.55301 4.76783 1.5583 5.2414C1.57209 6.10319 1.75914 6.9534 2.1083 7.7414C2.53013 8.70126 3.05546 9.61222 3.67497 10.4581C4.35989 11.3971 5.11481 12.2829 5.9333 13.1081C6.76186 13.9286 7.65044 14.6863 8.59163 15.3747C9.44271 16.0045 10.3625 16.5357 11.3333 16.9581C11.9248 17.2606 12.5706 17.4422 13.2331 17.4923C13.8956 17.5423 14.5614 17.4599 15.1916 17.2497C15.63 17.0613 16.0202 16.7764 16.3333 16.4164C16.5208 16.206 16.6779 15.9704 16.8 15.7164C16.8977 15.5166 16.949 15.2972 16.95 15.0747C16.95 14.9308 16.9187 14.7887 16.8583 14.6581C16.8081 14.5527 16.7266 14.4654 16.625 14.4081L13.8583 12.4414C13.7155 12.3387 13.5618 12.2521 13.4 12.1831C13.3189 12.1363 13.2269 12.1116 13.1333 12.1116C13.0397 12.1116 12.9477 12.1363 12.8666 12.1831C12.6921 12.296 12.5373 12.4367 12.4083 12.5997L11.7666 13.2247C11.6095 13.3736 11.414 13.4759 11.2021 13.52C10.9902 13.5642 10.7702 13.5485 10.5666 13.4747L10.3416 13.3747C9.91465 13.1422 9.51494 12.8627 9.14997 12.5414C8.74997 12.1997 8.31664 11.8081 7.79164 11.2831C7.26664 10.7581 6.9583 10.4497 6.54997 9.93307C6.23692 9.56766 5.95797 9.17435 5.71664 8.75807L5.61664 8.50807C5.57219 8.37653 5.54967 8.23858 5.54997 8.09974C5.54776 7.95588 5.57467 7.81306 5.62909 7.67987C5.68351 7.54669 5.76431 7.42588 5.86663 7.32474L6.49163 6.67474C6.63549 6.53533 6.76147 6.37857 6.86664 6.20807C6.91988 6.12254 6.95136 6.02526 6.95831 5.92474C6.95306 5.83512 6.93042 5.74737 6.89164 5.66641C6.82194 5.50065 6.73239 5.34395 6.62497 5.19974L4.69164 2.46641C4.61236 2.35234 4.50264 2.26283 4.37497 2.20807C4.24477 2.13435 4.09936 2.09158 3.94998 2.08307Z"
        fill={color}
      />
      <path
        d="M14.7083 7.91641C14.5425 7.91641 14.3836 7.85056 14.2664 7.73335C14.1492 7.61614 14.0833 7.45717 14.0833 7.29141C13.9634 6.72828 13.6723 6.216 13.25 5.82474C12.8831 5.36421 12.3508 5.06519 11.7666 4.9914C11.6009 4.9914 11.4419 4.92556 11.3247 4.80835C11.2075 4.69114 11.1416 4.53216 11.1416 4.3664C11.1405 4.28402 11.1559 4.20224 11.1869 4.12591C11.2179 4.04957 11.2639 3.98023 11.3222 3.92197C11.3805 3.86371 11.4498 3.81771 11.5261 3.7867C11.6025 3.75569 11.6843 3.74028 11.7666 3.7414C12.2287 3.77272 12.6797 3.89742 13.0922 4.10797C13.5047 4.31853 13.8702 4.61056 14.1666 4.96641C14.802 5.58455 15.2052 6.40263 15.3083 7.28307C15.3085 7.44542 15.2464 7.60166 15.1348 7.71952C15.0231 7.83738 14.8704 7.90786 14.7083 7.91641Z"
        fill={color}
      />
      <path
        d="M17.625 7.91641C17.4592 7.91641 17.3003 7.85056 17.183 7.73335C17.0658 7.61614 17 7.45717 17 7.29141C16.9978 5.91075 16.4483 4.58727 15.4721 3.61099C14.4958 2.63472 13.1723 2.08528 11.7916 2.08307C11.6259 2.08307 11.4669 2.01723 11.3497 1.90002C11.2325 1.78281 11.1666 1.62383 11.1666 1.45807C11.1655 1.37569 11.1809 1.29391 11.2119 1.21758C11.2429 1.14124 11.2889 1.07189 11.3472 1.01363C11.4055 0.955371 11.4748 0.909375 11.5511 0.878363C11.6275 0.847351 11.7093 0.831952 11.7916 0.833073C13.5024 0.837481 15.1417 1.51959 16.3506 2.73005C17.5595 3.9405 18.2394 5.58067 18.2416 7.29141C18.2395 7.45508 18.1742 7.61159 18.0592 7.72811C17.9442 7.84463 17.7886 7.91211 17.625 7.91641Z"
        fill={color}
      />
    </svg>
  );
};
import './PhoneNumberInput.scss';
import { useTranslation } from 'react-i18next';

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
const PhoneNumberInput: FC<TProps> = ({ className = '', onFocus, onBlur, form, label, width, rules, addonBefore, hideIcon, name = 'phoneNumber', placeholder, autoFocus }) => {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedCharacters = /[0-9+ ]/;
    const currentValue = form?.getFieldValue(name);
    const key = event.key;
    const cursorPosition = (event.target as HTMLInputElement).selectionStart || 0;
    const inputElement = event.target as HTMLInputElement;

    if (cursorPosition < 6 && key == 'Backspace') {
      form?.setFieldValue(name, '+998 ');
      inputElement.setSelectionRange(currentValue?.length, currentValue?.length);
      event.preventDefault();
      return;
    } else if (cursorPosition < 5 && key !== 'ArrowRight') {
      form?.setFieldValue(name, '+998 ');
      inputElement.setSelectionRange(currentValue?.length, currentValue?.length);
      event.preventDefault();
      return;
    }
    // If the key is a control key (Backspace, Delete, Arrow keys, Tab), allow it
    if (key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Tab') {
      return; // Allow these keys to function normally
    }
    // If the key is not a digit or '+', prevent input
    if (!allowedCharacters.test(key) || currentValue?.length > 16) {
      event.preventDefault();
    }
  };

  const beforeFocus = () => {
    if (onFocus) onFocus();
    setIsFocused(true);
  };

  const beforeBlur = () => {
    if (onBlur) onBlur();
    setIsFocused(false);
  };

  // Function to format phone number as +998 94 974 95 62
  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const cleaned = value?.replace(/\D/g, '');

    // Apply formatting progressively as the user types
    if (cleaned.length <= 3) {
      return `+${cleaned}`; // Only country code part
    } else if (cleaned.length <= 5) {
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3)}`; // +998 XX
    } else if (cleaned.length <= 8) {
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5)}`; // +998 XX XXX
    } else if (cleaned.length <= 10) {
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`; // +998 XX XXX XX
    } else {
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10, 12)}`; // Full format: +998 XX XXX XX XX
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = formatPhoneNumber(value);
    if (value.startsWith('+998 ')) {
      form?.setFieldValue(name, formattedValue);
    } else {
      form?.setFieldValue(name, '+998 ');
    }
  };

  const inputRef = useRef<InputRef | null>(null);

  useEffect(() => {
    if (autoFocus && beforeFocus) {
      setTimeout(() => {
        beforeFocus();
        inputRef?.current?.focus();
      }, 0);
    }
  }, [autoFocus]);

  return (
    <Form.Item
      rules={
        rules && [
          ...rules,
          {
            min: 17,
            message: ' ',
          },
        ]
      }
      label={label}
      className={`phone-number-input ${className} ${isFocused ? 'focused' : ''}`}
      name={name}
    >
      <Input
        id={'phoneNumberInput'}
        onChange={handleChange}
        ref={inputRef}
        onFocus={e => {
          beforeFocus();
          if (form && (form?.getFieldValue(name)?.length < 1 || form?.getFieldValue(name)?.length == undefined)) {
            form.setFieldValue(name, '+998 ');
            setTimeout(() => {
              const input = e.target;
              input.setSelectionRange(5, 5);
            }, 250);
          }
        }}
        onBlur={beforeBlur}
        onKeyDown={handleKeyPress}
        addonBefore={hideIcon ? undefined : addonBefore || <IconCallCalling size={20} color={'#A5A8AD'} />}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};

export default PhoneNumberInput;
