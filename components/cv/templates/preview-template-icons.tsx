import { MapPin } from "lucide-react"
import {
  LinkedInLogoIcon,
  MobileIcon,
  EnvelopeClosedIcon,
  InstagramLogoIcon,
  GitHubLogoIcon,
  GlobeIcon,
  VercelLogoIcon,
  FileIcon
} from "@radix-ui/react-icons"
import { PreviewIcons } from "@/types/cvForm"

export const ModernIcons: Record<string, React.ReactNode> = {
  [PreviewIcons.file]: <FileIcon className="h-3 w-3" />,
  // [PreviewIcons.window]: 'window',
  [PreviewIcons.globe]: <GlobeIcon className="h-3 w-3" />,
  // [PreviewIcons.next]: 'next',
  [PreviewIcons.vercel]: <VercelLogoIcon className="h-3 w-3" />,
  [PreviewIcons.email]: <EnvelopeClosedIcon className="h-3 w-3" />,
  [PreviewIcons.location]: <MapPin className="h-3 w-3" />,
  [PreviewIcons.phone]: <MobileIcon className="h-3 w-3" />,
  // [PreviewIcons.hat]: 'hat',
  [PreviewIcons.github]: <GitHubLogoIcon className="h-3 w-3" />,
  // [PreviewIcons.facebook]: <svg xmlns="http://www.w3.org/2000/svg" height="10" width="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
  [PreviewIcons.insta]: <InstagramLogoIcon className="h-3 w-3" />,
  [PreviewIcons.linked]: <LinkedInLogoIcon className="h-3 w-3" />,
  // [PreviewIcons.telegram]: 'telegram',
  // [PreviewIcons.cert]: 'cert',
  // [PreviewIcons.locked]: 'locked',
  // [PreviewIcons.unlocked]: 'unlocked',
  // [PreviewIcons.user]: 'user',
}
