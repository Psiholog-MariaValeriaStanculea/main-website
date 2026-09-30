import { storage } from "@/lib/storage";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { X, Settings, Cookie } from "lucide-react";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const normalizePreferences = (value: unknown): CookiePreferences => ({
  necessary: true,
  analytics: Boolean((value as CookiePreferences | undefined)?.analytics),
  marketing: Boolean((value as CookiePreferences | undefined)?.marketing),
});

export function CookieBanner() {
  const { t } = useTranslation('common');
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  const persistPreferences = (nextPreferences: CookiePreferences) => {
    storage.setItem('cookie-consent', JSON.stringify(nextPreferences));
    setPreferences(nextPreferences);
  };

  useEffect(() => {
    const consent = storage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(consent);
        setPreferences(normalizePreferences(parsed));
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
        storage.removeItem('cookie-consent');
        setShowBanner(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    try {
      persistPreferences(allAccepted);
      setShowBanner(false);
      setShowCustomize(false);
      toast({
        title: t('cookies.preferences'),
        description: t('cookies.acceptAll'),
      });
    } catch (error) {
      console.error('Error saving cookie preferences:', error);
    }
  };

  const handleRejectAll = () => {
    const onlyNecessary = { necessary: true, analytics: false, marketing: false };
    try {
      persistPreferences(onlyNecessary);
      setShowBanner(false);
      setShowCustomize(false);
      toast({
        title: t('cookies.preferences'),
        description: t('cookies.rejectAll'),
      });
    } catch (error) {
      console.error('Error saving cookie preferences:', error);
    }
  };

  const handleSavePreferences = () => {
    try {
      persistPreferences(normalizePreferences(preferences));
      setShowBanner(false);
      setShowCustomize(false);
      toast({
        title: t('cookies.preferences'),
        description: t('cookies.preferences'),
      });
    } catch (error) {
      console.error('Error saving cookie preferences:', error);
    }
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleDismiss = () => {
    persistPreferences(normalizePreferences(preferences));
    setShowBanner(false);
    setShowCustomize(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Mobile-optimized banner */}
      <div className="fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ease-out">
        <div className="bg-background/98 backdrop-blur-md border-t border-border shadow-2xl">
          <div className="container max-w-4xl mx-auto p-4">
            <div className="flex items-start gap-3">
              <Cookie className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {t('cookies.title')}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {t('cookies.description')}
                </p>
                
                {/* Mobile-first button layout */}
                <div className="flex flex-col gap-2">
                  {isMobile ? (
                    // Mobile: Stack buttons vertically
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Button 
                          onClick={handleAcceptAll} 
                          size="sm" 
                          className="flex-1 h-9 text-xs"
                        >
                          {t('cookies.acceptAll')}
                        </Button>
                        <Button 
                          onClick={handleRejectAll} 
                          variant="outline" 
                          size="sm"
                          className="flex-1 h-9 text-xs"
                        >
                          {t('cookies.rejectAll')}
                        </Button>
                      </div>
                      <Dialog open={showCustomize} onOpenChange={setShowCustomize}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full h-9 text-xs"
                          >
                            <Settings className="h-3 w-3 mr-1" />
                            {t('cookies.customize')}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[90vw] mx-4">
                          <DialogHeader>
                            <DialogTitle className="text-base">
                              {t('cookies.customize')}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Checkbox checked={true} disabled />
                                <label className="text-sm font-medium text-muted-foreground">
                                  {t('cookies.necessary')}
                                </label>
                              </div>
                              <span className="text-xs text-muted-foreground">Obligatorii</span>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  checked={preferences.analytics}
                                  onCheckedChange={(checked) => updatePreference('analytics', !!checked)}
                                />
                                <label className="text-sm font-medium">
                                  {t('cookies.analytics')}
                                </label>
                              </div>
                              <span className="text-xs text-muted-foreground">Opțional</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  checked={preferences.marketing}
                                  onCheckedChange={(checked) => updatePreference('marketing', !!checked)}
                                />
                                <label className="text-sm font-medium">
                                  {t('cookies.marketing')}
                                </label>
                              </div>
                              <span className="text-xs text-muted-foreground">Opțional</span>
                            </div>
                            
                            <Button 
                              onClick={handleSavePreferences} 
                              className="w-full h-10"
                            >
                              {t('save')}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ) : (
                    // Desktop: Horizontal layout
                    <div className="flex items-center gap-2">
                      <Dialog open={showCustomize} onOpenChange={setShowCustomize}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8 text-xs">
                            <Settings className="h-3 w-3 mr-1" />
                            {t('cookies.customize')}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>{t('cookies.customize')}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Checkbox checked={true} disabled />
                                <label className="text-sm font-medium text-muted-foreground">
                                  {t('cookies.necessary')}
                                </label>
                              </div>
                              <span className="text-xs text-muted-foreground">Obligatorii</span>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  checked={preferences.analytics}
                                  onCheckedChange={(checked) => updatePreference('analytics', !!checked)}
                                />
                                <label className="text-sm font-medium">
                                  {t('cookies.analytics')}
                                </label>
                              </div>
                              <span className="text-xs text-muted-foreground">Opțional</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  checked={preferences.marketing}
                                  onCheckedChange={(checked) => updatePreference('marketing', !!checked)}
                                />
                                <label className="text-sm font-medium">
                                  {t('cookies.marketing')}
                                </label>
                              </div>
                              <span className="text-xs text-muted-foreground">Opțional</span>
                            </div>
                            
                            <Button onClick={handleSavePreferences} className="w-full">
                              {t('save')}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        onClick={handleRejectAll} 
                        variant="outline" 
                        size="sm"
                        className="h-8 text-xs"
                      >
                        {t('cookies.rejectAll')}
                      </Button>
                      <Button 
                        onClick={handleAcceptAll} 
                        size="sm"
                        className="h-8 text-xs"
                      >
                        {t('cookies.acceptAll')}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Close button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="h-6 w-6 p-0 hover:bg-muted rounded-full flex-shrink-0"
                aria-label={t('close')}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
