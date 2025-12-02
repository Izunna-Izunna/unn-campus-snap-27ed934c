import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, X, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CATEGORIES, CONDITIONS, CAMPUSES } from "@/utils/constants";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const steps = ["Photos", "Details", "Preview"];

export const SellPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form state
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [campus, setCampus] = useState("Nsukka");
  const [description, setDescription] = useState("");

  const progress = ((currentStep + 1) / steps.length) * 100;

  // Mock image upload
  const handleAddImage = () => {
    if (images.length < 10) {
      // Mock adding placeholder images
      const mockImages = [
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
      ];
      setImages([...images, mockImages[images.length % mockImages.length]]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Post product
      toast({
        title: "Posted successfully!",
        description: "Your item is now live on KayMart.",
      });
      navigate("/profile");
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return images.length > 0;
      case 1:
        return title && price && category && condition && description;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-4 border-b border-border">
        <button
          onClick={() => currentStep > 0 ? setCurrentStep(prev => prev - 1) : navigate(-1)}
          className="p-2 -ml-2 text-foreground hover:text-muted-foreground transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="font-semibold">Sell Item</span>
        <span className="text-sm text-muted-foreground">
          {currentStep + 1}/{steps.length}
        </span>
      </header>

      <Progress value={progress} className="h-1 rounded-none" />

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {currentStep === 0 && (
          <div className="p-4 animate-fade-in">
            <h2 className="text-xl font-bold mb-2">Add photos</h2>
            <p className="text-muted-foreground text-sm mb-4">Add up to 10 photos. First photo is the cover.</p>
            
            <div className="grid grid-cols-3 gap-2">
              {images.map((img, idx) => (
                <div key={idx} className="aspect-square relative rounded-lg overflow-hidden bg-secondary">
                  <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 w-6 h-6 bg-foreground/80 rounded-full flex items-center justify-center"
                  >
                    <X className="w-4 h-4 text-background" />
                  </button>
                  {idx === 0 && (
                    <span className="absolute bottom-1 left-1 text-xs bg-foreground/80 text-background px-2 py-0.5 rounded">
                      Cover
                    </span>
                  )}
                </div>
              ))}
              
              {images.length < 10 && (
                <button
                  onClick={handleAddImage}
                  className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <Camera className="w-6 h-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Add Photo</span>
                </button>
              )}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="p-4 space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold">Product details</h2>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="What are you selling?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                className="h-12"
              />
              <p className="text-xs text-muted-foreground text-right">{title.length}/100</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (₦)</Label>
              <Input
                id="price"
                type="number"
                placeholder="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-12 px-4 pr-10 bg-background border border-input rounded-lg appearance-none"
                >
                  <option value="">Select category</option>
                  {CATEGORIES.filter(c => c.id !== "all").map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Condition</Label>
              <div className="flex flex-wrap gap-2">
                {CONDITIONS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCondition(c)}
                    className={cn(
                      "px-4 py-2 rounded-lg border transition-colors",
                      condition === c
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Campus</Label>
              <div className="relative">
                <select
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  className="w-full h-12 px-4 pr-10 bg-background border border-input rounded-lg appearance-none"
                >
                  {CAMPUSES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
                className="min-h-[120px]"
              />
              <p className="text-xs text-muted-foreground text-right">{description.length}/500</p>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="p-4 animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Preview your listing</h2>
            
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="aspect-square bg-secondary">
                <img src={images[0]} alt={title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-2">
                <p className="text-2xl font-bold text-primary">₦{Number(price).toLocaleString()}</p>
                <h3 className="font-semibold">{title}</h3>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{condition}</span>
                  <span className="text-xs text-muted-foreground">{campus} Campus</span>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(1)}
              className="w-full mt-4 py-2 text-primary font-medium"
            >
              Edit Details
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          size="lg"
          className="w-full h-14 text-lg font-semibold"
          onClick={handleNext}
          disabled={!canProceed()}
        >
          {currentStep === steps.length - 1 ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              Post Now
            </>
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </div>
  );
};

export default SellPage;
