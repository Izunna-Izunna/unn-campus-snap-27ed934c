import { useState } from "react";
import { X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface CreateAdvertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const advertTypes = [
  { value: "service", label: "Service" },
  { value: "event", label: "Event" },
  { value: "business", label: "Business" },
  { value: "announcement", label: "Announcement" },
];

const durations = [
  { value: "7", label: "7 days" },
  { value: "14", label: "14 days" },
  { value: "30", label: "30 days" },
];

const campuses = [
  { value: "nsukka", label: "Nsukka" },
  { value: "enugu", label: "Enugu" },
  { value: "ituku-ozalla", label: "Ituku-Ozalla" },
];

export const CreateAdvertModal = ({ isOpen, onClose }: CreateAdvertModalProps) => {
  const [advertType, setAdvertType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [campus, setCampus] = useState("nsukka");
  const [duration, setDuration] = useState("7");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!advertType || !title || !description || (!phone && !whatsapp)) {
      toast.error("Please fill all required fields");
      return;
    }
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Advert posted successfully!");
    setIsLoading(false);
    onClose();
    
    // Reset form
    setAdvertType("");
    setTitle("");
    setDescription("");
    setPrice("");
    setPhone("");
    setWhatsapp("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-background w-full sm:max-w-md sm:rounded-xl rounded-t-xl max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
          <h2 className="font-semibold text-lg">Post Advert</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-secondary rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto max-h-[calc(90vh-120px)] space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Advert Type</label>
            <div className="flex flex-wrap gap-2">
              {advertTypes.map(type => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setAdvertType(type.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    advertType === type.value
                      ? "bg-amber-500 text-white"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Engineering Tutoring"
              maxLength={80}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell people about your service or event..."
              maxLength={500}
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">{description.length}/500 characters</p>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Price (Optional)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                className="pl-7"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Phone</label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0812-XXX-XXXX"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">WhatsApp</label>
              <Input
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="0812-XXX-XXXX"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Campus/Location</label>
            <Select value={campus} onValueChange={setCampus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {campuses.map(c => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Upload Images (Up to 5)</label>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="aspect-square border-2 border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Duration</label>
            <div className="flex gap-2">
              {durations.map(d => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDuration(d.value)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    duration === d.value
                      ? "bg-amber-500 text-white"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white">
              {isLoading ? "Posting..." : "Post Advert"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
