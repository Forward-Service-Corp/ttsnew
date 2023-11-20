import Image from 'next/image'
import fscLogo from '/public/img/TTS_Logo2_vertical.png'

export default function TtsLogo() {
    return (
        <Image
            src={fscLogo}
            alt="Forward Service Corporation logo"
            width={500}
            height={500}
        />
    )
}
