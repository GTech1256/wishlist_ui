import { useFormContext, UseFormReturn } from "react-hook-form";

interface OwnProps {
  children: (data: UseFormReturn<any>) => React.ReactElement | null;
}

type Props = OwnProps;

const FormConnect: React.FC<Props> = ({ children }) => {
  const form = useFormContext();

  return children({
    ...form,
  });
};

export default FormConnect;
