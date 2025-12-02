import { Search, MessageCircle, Eye, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Request } from "@/utils/requestsAdvertsData";

interface RequestCardProps {
  request: Request;
}

export const RequestCard = ({ request }: RequestCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 mb-3 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={request.avatar}
          alt={request.username}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-border"
        />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-foreground truncate">{request.username}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>{request.location}</span>
            <span>•</span>
            <span>{request.timeAgo}</span>
          </div>
        </div>
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium mb-3">
        <Search className="w-3 h-3" />
        LOOKING FOR
      </div>

      {/* Content */}
      <h3 className="font-semibold text-foreground mb-1">{request.title}</h3>
      <p className="text-sm text-muted-foreground mb-2">
        Budget: {formatPrice(request.budgetMin)} - {formatPrice(request.budgetMax)}
      </p>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        "{request.description}"
      </p>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
        <span className="flex items-center gap-1">
          <MessageCircle className="w-3.5 h-3.5" />
          {request.offersCount} offers
        </span>
        <span className="flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" />
          {request.viewsCount} views
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button size="sm" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
          Make Offer
        </Button>
        <Button size="sm" variant="outline" className="flex-1">
          Message
        </Button>
      </div>
    </div>
  );
};
