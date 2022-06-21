interface ICalloutProps extends React.PropsWithChildren {
    title: string,
    children: | JSX.Element
        | JSX.Element[]
        | string
        | string[];
}

export default function Callout({ title, children }: ICalloutProps) {
    return <section className="p-3 pl-6 mb-6 border border-l-2 rounded bg-amber-50 border-l-amber-500">
        <h2 className="my-0 font-normal text-amber-700">{title}</h2>
        {children}
    </section>

}