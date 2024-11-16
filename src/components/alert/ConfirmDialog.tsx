import tempImg from '../../../public/images/timetoast.png';
import { Dialog } from '../common-components/dialog';

import Image from 'next/image';

export type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

export default function ConfirmDialog(props: ConfirmDialogProps) {
  return (
    <Dialog open={props.isOpen} onClose={props.onClose}>
      <Dialog.Title className="">{props.title}</Dialog.Title>
      <Dialog.Description className="flex flex-col items-center">
        <Image src={tempImg} alt="" width={120} height={120} />
        {props.description}
      </Dialog.Description>
      <Dialog.Footer className="">{props.children}</Dialog.Footer>
    </Dialog>
  );
}
