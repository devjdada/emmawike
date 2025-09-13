import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Home, Bed, Bath, Square, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import penthouseImg from "@/assets/penthouse.jpg";
import familyHomeImg from "@/assets/family-home.jpg";
import waterfrontVillaImg from "@/assets/waterfront-villa.jpg";
import urbanLoftImg from "@/assets/urban-loft.jpg";
import mountainRetreatImg from "@/assets/mountain-retreat.jpg";

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PropertyMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  // Sample properties with coordinates
  const properties = [
    {
      id: 1,
      title: "Luxury Penthouse in Downtown",
      price: "$2,500,000",
      location: "New York, NY",
      beds: 4,
      baths: 3,
      sqft: 3200,
      type: "Penthouse",
      featured: true,
      status: "Published",
      coordinates: [40.7128, -74.006] as [number, number], // [lat, lng]
      imageUrl: penthouseImg
    },
    {
      id: 2,
      title: "Modern Family Home",
      price: "$850,000",
      location: "Los Angeles, CA",
      beds: 5,
      baths: 4,
      sqft: 4500,
      type: "House",
      featured: false,
      status: "Published",
      coordinates: [34.0522, -118.2437] as [number, number],
      imageUrl: familyHomeImg
    },
    {
      id: 3,
      title: "Waterfront Villa",
      price: "$3,200,000",
      location: "Miami, FL",
      beds: 6,
      baths: 5,
      sqft: 5200,
      type: "Villa",
      featured: true,
      status: "Published",
      coordinates: [25.7617, -80.1918] as [number, number],
      imageUrl: waterfrontVillaImg
    },
    {
      id: 4,
      title: "Urban Loft",
      price: "$650,000",
      location: "Chicago, IL",
      beds: 2,
      baths: 2,
      sqft: 1800,
      type: "Loft",
      featured: false,
      status: "Published",
      coordinates: [41.8781, -87.6298] as [number, number],
      imageUrl: urbanLoftImg
    },
    {
      id: 5,
      title: "Mountain Retreat",
      price: "$1,200,000",
      location: "Denver, CO",
      beds: 4,
      baths: 3,
      sqft: 3500,
      type: "House",
      featured: true,
      status: "Published",
      coordinates: [39.7392, -104.9903] as [number, number],
      imageUrl: mountainRetreatImg
    }
  ];

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current).setView([39.8283, -98.5795], 4);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.current);

    // Add property markers
    properties.forEach((property) => {
      const markerHtml = `
        <div class="property-marker ${property.featured ? 'featured' : ''}">
          <div class="marker-content">
            <div class="marker-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="hsl(var(--primary))" stroke="white" stroke-width="2"/>
                <circle cx="12" cy="9" r="2.5" fill="white"/>
              </svg>
            </div>
            <div class="marker-price">${property.price}</div>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-div-icon',
        iconSize: [40, 50],
        iconAnchor: [20, 50],
        popupAnchor: [0, -50]
      });

      const marker = L.marker(property.coordinates, { icon: customIcon })
        .addTo(map.current!)
        .on('click', () => {
          setSelectedProperty(property);
        });

      // Add popup
      marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-semibold text-sm">${property.title}</h3>
          <p class="text-lg font-bold text-primary">${property.price}</p>
          <p class="text-xs text-muted-foreground">${property.location}</p>
        </div>
      `);
    });

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/admin/properties" className="inline-flex">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Properties
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Property Map</h1>
                <p className="text-muted-foreground">View all properties on an interactive map</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                <MapPin className="h-3 w-3 mr-1" />
                {properties.length} Properties
              </Badge>
            </div>
          </div>

          {/* Map Container */}
          <div className="relative">
            <div 
              ref={mapContainer}
              className="w-full h-[600px] rounded-lg shadow-lg"
            />
            
            {/* Property Details Sidebar */}
            {selectedProperty && (
              <Card className="absolute top-4 left-4 w-80 shadow-xl">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{selectedProperty.title}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedProperty(null)}
                      >
                        ×
                      </Button>
                    </div>
                    
                    <img 
                      src={selectedProperty.imageUrl} 
                      alt={selectedProperty.title}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          {selectedProperty.price}
                        </span>
                        {selectedProperty.featured && (
                          <Badge variant="secondary">Featured</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedProperty.location}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          {selectedProperty.beds} beds
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          {selectedProperty.baths} baths
                        </div>
                        <div className="flex items-center">
                          <Square className="h-4 w-4 mr-1" />
                          {selectedProperty.sqft} sqft
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Home className="h-4 w-4 mr-1" />
                        <span className="text-sm">{selectedProperty.type}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Contact Agent
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Custom styles for markers */}
      <style>{`
        .custom-div-icon {
          background: none !important;
          border: none !important;
        }
        
        .property-marker {
          cursor: pointer;
        }
        
        .marker-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        
        .marker-icon {
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }
        
        .marker-price {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .property-marker:hover .marker-icon {
          transform: scale(1.1);
          transition: transform 0.2s ease;
        }
        
        .property-marker:hover .marker-price {
          background: hsl(var(--accent));
          color: hsl(var(--accent-foreground));
        }
        
        .property-marker.featured .marker-price {
          background: hsl(var(--accent));
          color: hsl(var(--accent-foreground));
        }
      `}</style>
    </div>
  );
};

export default PropertyMap;