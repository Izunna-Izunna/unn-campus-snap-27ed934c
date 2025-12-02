import { Megaphone, MapPin, BadgeCheck, Phone, Wrench, PartyPopper, Briefcase, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Advert } from "@/utils/requestsAdvertsData";

interface AdvertCardProps {
  advert: Advert;
}

const typeConfig = {
  service: { icon: Wrench, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
  event: { icon: PartyPopper, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" },
  business: { icon: Briefcase, color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" },
  announcement: { icon: Bell, color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300" },
};

export const AdvertCard = ({ advert }: AdvertCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const TypeIcon = typeConfig[advert.type].icon;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden mb-3 hover:shadow-md transition-all duration-200">
      {/* Badge */}
      <div className={`flex items-center gap-1.5 px-3 py-1.5 ${typeConfig[advert.type].color} text-xs font-medium`}>
        <Megaphone className="w-3 h-3" />
        ADVERT
        <span className="mx-1">•</span>
        <TypeIcon className="w-3 h-3" />
        <span className="capitalize">{advert.type}</span>
      </div>

      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={advert.avatar}
            alt={advert.username}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-border"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-medium text-sm text-foreground">{advert.username}</p>
              {advert.verified && (
                <BadgeCheck className="w-4 h-4 text-accent fill-accent/20" />
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{advert.location}</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">{advert.timeAgo}</span>
        </div>

        {/* Image */}
        {advert.image && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
            <img
              src={advert.image}
              alt={advert.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <h3 className="font-semibold text-foreground mb-1">{advert.title}</h3>
        {advert.price && (
          <p className="text-sm font-medium text-accent mb-2">
            {formatPrice(advert.price)}/hour
          </p>
        )}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          "{advert.description}"
        </p>

        {/* Contact */}
        {(advert.phone || advert.whatsapp) && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Phone className="w-3.5 h-3.5" />
            <span>{advert.phone || advert.whatsapp}</span>
          </div>
        )}

        {/* Action */}
        <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-600 text-white">
          Contact Seller
        </Button>
      </div>
    </div>
  );
};
