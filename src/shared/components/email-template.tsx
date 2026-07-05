type Props = {
    fullName: string
    email: string
    message: string
}

export default function EmailTemplate({ fullName, email, message }: Props) {
    return (
        <p>
            A new message was submitted:
            <br />
            <br />
            From: <strong>{email}</strong>
            <br />
            Message:
            <br />
            {message}
            <br />
            <br />
            Best regards,
            <br />
            {fullName}
        </p>
    )
}
