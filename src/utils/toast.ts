import toast from 'react-hot-toast';

export type ToastProps = {
  text: string;
  icon: string;
};
export const notifyToast = ({ text, icon }: ToastProps) => {
  toast.success(text, { duration: 800, icon: icon });
};

export const notifySuccess = (text: string) => {
  toast.success(text);
};

export const notifyError = (text: string) => {
  toast.error(text);
};

export const notifyLater = () => {
  toast.success('아직 준비되지 않은 기능입니다!', {
    duration: 800,
    icon: '🙂',
  });
};
