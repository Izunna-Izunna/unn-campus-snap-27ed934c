import { useState } from "react";
import { X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface CreateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { value: "books", label: "Books" },
  { value: "electronics", label: "Electronics" },
  { value: "furniture", label: "Furniture" },
  { value: "fashion", label: "Fashion" },
  { value: "services", label: "Services" },
  { value: "other", label: "Other" },
];

const conditions = ["New", "Like New", "Good", "Any"];

const campuses = [
  { value: "nsukka", label: "Nsukka" },
  { value: "enugu", label: "Enugu" },
  { value: "ituku-ozalla", label: "Ituku-Ozalla" },
];

export const CreateRequestModal = ({ isOpen, onClose }: CreateRequestModalProps) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [budgetRange, setBudgetRange] = useState([2000, 10000]);
  const [condition, setCondition] = useState("Any");
  const [campus, setCampus] = useState("nsukka");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !description) {
      toast.error("Please fill all required fields");
      return;
    }
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Request posted successfully!");
    setIsLoading(false);
    onClose();
    
    // Reset form
    setTitle("");
    setCategory("");
    setBudgetRange([2000, 10000]);
    setCondition("Any");
    setDescription("");
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
          <h2 className="font-semibold text-lg">Create Request</h2>
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
            <label className="text-sm font-medium mb-1.5 block">What are you looking for?</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Engineering textbook"
              maxLength={100}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Budget Range: ₦{budgetRange[0].toLocaleString()} - ₦{budgetRange[1].toLocaleString()}
            </label>
            <Slider
              value={budgetRange}
              onValueChange={setBudgetRange}
              min={0}
              max={500000}
              step={500}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Condition Needed</label>
            <div className="flex flex-wrap gap-2">
              {conditions.map(cond => (
                <button
                  key={cond}
                  type="button"
                  onClick={() => setCondition(cond)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    condition === cond
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Campus</label>
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
            <label className="text-sm font-medium mb-1.5 block">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell sellers what you need and when you need it..."
              maxLength={300}
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">{description.length}/300 characters</p>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Reference Image (Optional)</label>
            <button
              type="button"
              className="w-full border-2 border-dashed border-border rounded-lg p-4 flex items-center justify-center gap-2 text-muted-foreground hover:border-accent hover:text-accent transition-colors"
            >
              <Camera className="w-5 h-5" />
              <span className="text-sm">Upload Image</span>
            </button>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-accent hover:bg-accent/90">
              {isLoading ? "Posting..." : "Post Request"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
