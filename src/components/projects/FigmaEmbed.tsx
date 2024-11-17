interface FigmaEmbedProps {
  url: string;
  title: string;
}

export const FigmaEmbed = ({ url, title }: FigmaEmbedProps) => {
  // Convert Figma URL to embed URL
  const embedUrl = url.replace('figma.com/', 'figma.com/embed?');

  return (
    <div className="space-y-2">
      <h3 className="font-medium">{title}</h3>
      <div className="w-full aspect-video rounded-lg overflow-hidden border">
        <iframe
          className="w-full h-full"
          src={embedUrl}
          allowFullScreen
        />
      </div>
    </div>
  );
};