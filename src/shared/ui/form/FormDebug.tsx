import { useFormContext } from "react-hook-form";

interface OwnProps {
  path?: string;
}

type Props = OwnProps;

const FormDebug = (props: Props) => {
  const { path = "" } = props;
  const {
    getFieldState,
    watch,
    formState: { errors },
  } = useFormContext();
  const { error } = getFieldState(path);
  const values = path ? watch(path) : watch();

  return (
    <pre>
      {JSON.stringify(values, null, 2)} <br /> Validation error: {JSON.stringify(path ? error : errors, null, 2)}
    </pre>
  );
};

export default FormDebug;
