import clsx from 'clsx';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

type Props<T extends FieldValues> = {
    type?: string;
    label: string;
    min?: Date;
} & UseControllerProps<T>;

export default function TextInput<T extends FieldValues>(props: Props<T>) {
    const {field, fieldState} = useController({...props});

    const minDate = props.min?.toISOString().slice(0, 16);

    return (
        <label className="floating-label text-left w-full">
            <span>{props.label}</span>
            <input
                {...field}
                value={field.value ?? ''}
                type={props.type}
                className={clsx('input input-lg w-full', {
                    'input-error': !!fieldState.error,
                    'input-success': !fieldState.error && fieldState.isDirty
                })}
                min={minDate}
                placeholder={props.label} />
            {fieldState.error && (
                <div className="validator-hint text-error">
                    {fieldState.error.message}
                </div>
            )}
        </label>
    )
}