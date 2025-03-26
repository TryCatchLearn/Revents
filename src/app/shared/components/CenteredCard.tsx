import React from "react"

type Props = {
    children: React.ReactNode;
    icon: React.ElementType;
    title: string;
}

export default function CenteredCard({children, icon: Icon, title}: Props) {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-160px)]">
            <div className="card bg-base-100 shadow-lg p-6 w-1/2 gap-6">
                <div className="card-title text-primary justify-center">
                    <Icon className="size-10" />
                    <h3 className="text-3xl">{title}</h3>
                </div>
                {children}
            </div>
        </div>
    )
}