import Image from 'next/image'
import fscLogo from '/public/img/fsc-logo.png'

export default function FscLogo() {
    return (
        <Image
            src={fscLogo}
            alt="Forward Service Corporation logo"
            width={500}
            height={500}
        />
    )
}
