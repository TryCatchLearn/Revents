import clsx from 'clsx';
import { FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>;
    name: Path<T>;
    errors: FieldErrors<T>;
    options?: RegisterOptions<T>;
    type?: string;
    label: string;
}

export default function UncontrolledInput<T extends FieldValues>({ register, name, errors, options, type = 'text',
    label }: Props<T>) {
    return (
        <label className="floating-label text-left">
            <span>{label}</span>
            <input
                {...register(name, options)}
                type={type}
                className={clsx('input input-lg w-full', {
                    'input-error': errors[name]
                })}
                placeholder={label} />
            {errors.title && (
                <div className="validator-hint text-error">{errors[name]?.message as string}</div>
            )}
        </label>
    )
}