type ErrorPropsType = {
  title: string;
};

const ErrorPage: React.FC<ErrorPropsType> = (props) => {
  return (
    <div>
      <p>{props.title}</p>
    </div>
  );
};

export default ErrorPage;
