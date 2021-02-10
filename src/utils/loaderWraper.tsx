import * as React from 'react';

interface ILoaderWrap {
  isLoading: boolean;
  className?: string;
  children?: React.ReactNode;
  type?: 'Spinner' | 'Main';
}

export const LoaderWrap: React.FC<ILoaderWrap> = props => {
  const { isLoading, className, type } = props;
  if (isLoading) {
    return type && type === 'Main' ? (
      <MainLoader className={className ? className : ''} />
    ) : (
      <SpinnerLoader className={className ? className : ''} />
    );
  }
  return <>{props.children}</>;
};

export const MainLoader = ({ className }: { className: string }) => {
  return (
    <div className={`loader-wrap ${className}`}>
      <svg
        className="svg-loader"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="100%"
        height="100%"
        viewBox="0 0 500 500"
        id="loader"
      >
        <polygon className="segment" points="250,250 250,0 465,126" />
        <polygon className="segment" points="250,250 465,126 465,375" />
        <polygon className="segment" points="250,250 465,375 250,500" />
        <polygon className="segment" points="250,250 250,500 36,375" />
        <polygon className="segment" points="250,250 36,375 36,126" />
        <polygon className="segment" points="250,250 36,126 250,0" />
      </svg>
    </div>
  );
};

export const SpinnerLoader = ({ className }: { className: string }) => {
  return (
    <div className={`loader-wrap ${className}`}>
      <svg
        version="1.1"
        id="loader-1"
        x="0px"
        y="0px"
        width="50px"
        height="50px"
        viewBox="0 0 40 40"
        enableBackground="new 0 0 40 40"
      >
        <path
          opacity="0.2"
          fill="#174e4d"
          d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
          s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
          c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
        />
        <path
          fill="#174e4d"
          d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
          C22.32,8.481,24.301,9.057,26.013,10.047z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};
