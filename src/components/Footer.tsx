import { Brain, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">NeuroBridge</span>
            </div>
            <p className="text-background/70 leading-relaxed">
              Empowering autistic individuals in STEM with AI-powered communication training. 
              Build confidence, enhance skills, and bridge the communication gap.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#modules" className="text-background/70 hover:text-background transition-colors">
                  Course Modules
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-background/70 hover:text-background transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="#certification" className="text-background/70 hover:text-background transition-colors">
                  Certification
                </a>
              </li>
              <li>
                <a href="#demo" className="text-background/70 hover:text-background transition-colors">
                  Demo & Features
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#help" className="text-background/70 hover:text-background transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#faq" className="text-background/70 hover:text-background transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#accessibility" className="text-background/70 hover:text-background transition-colors">
                  Accessibility
                </a>
              </li>
              <li>
                <a href="#contact" className="text-background/70 hover:text-background transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-background/70" />
                <span className="text-background/70">support@neurobridge.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-background/70" />
                <span className="text-background/70">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-background/70" />
                <span className="text-background/70">San Francisco, CA</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-background/70">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-background/10 border border-background/20 rounded-md text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="sm" className="bg-gradient-primary">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-background/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-background/70 text-sm">
              © 2024 NeuroBridge. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-background/70 hover:text-background transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-background/70 hover:text-background transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="text-background/70 hover:text-background transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;