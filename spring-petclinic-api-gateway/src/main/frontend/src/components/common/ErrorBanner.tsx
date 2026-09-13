interface ErrorBannerProps {
  message: string | null;
}

export default function ErrorBanner({ message }: ErrorBannerProps) {
  if (!message) return null;

  return (
    <div className="alert alert-danger" role="alert" style={{ whiteSpace: 'pre-line' }}>
      {message}
    </div>
  );
}
