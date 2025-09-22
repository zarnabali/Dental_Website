# Contact Us Component

## Overview
The Contact Us component provides a comprehensive contact section for the Dr. Samiullah Dental Clinic website, featuring clinic information, a contact form, and Google Maps integration.

## Features

### 🏥 Clinic Information
- **Address**: 123 Dental Street, Medical District, City 12345
- **Phone**: (123) 456-7890 (clickable tel link)
- **Email**: info@drsamiullah.com (clickable mailto link)
- **Hours**: 
  - Mon - Fri: 9:00 AM - 6:00 PM
  - Sat: 9:00 AM - 2:00 PM
  - Sun: Emergency Only

### 📝 Contact Form
- **Fields**: Name, Email, Phone, Subject, Message
- **Validation**: Required fields with real-time validation
- **Subject Options**: General Consultation, Emergency, Cleaning, Whitening, Orthodontics, Other
- **Form States**: Loading, Success, Error handling
- **Responsive Design**: Mobile-friendly layout

### 🗺️ Google Maps Integration
- **Embedded Map**: Interactive Google Maps iframe
- **Location Link**: "Open in Google Maps" button
- **Responsive**: Adapts to different screen sizes

### 🎨 Design & Animations
- **Color Theme**: 
  - Primary: #963f36 (burgundy)
  - Secondary: #74886f (sage green)
  - Background: #f8f9fa (light gray for cards)
- **GSAP Animations**:
  - Fade in on scroll
  - Staggered animations for cards
  - Smooth transitions
- **Typography**: Almarai font family (consistent with site)
- **Layout**: Two-column responsive grid

## Files Created/Modified

### New Files
- `src/components/ContactUs.tsx` - Main contact component
- `src/app/contact/page.tsx` - Dedicated contact page
- `CONTACT_US_README.md` - This documentation

### Modified Files
- `src/app/page.tsx` - Added ContactUs component to main page
- `src/components/Header.tsx` - Added Contact navigation link

## Usage

### As a Section Component
```tsx
import ContactUs from "@/components/ContactUs";

export default function Page() {
  return (
    <div>
      <ContactUs />
    </div>
  );
}
```

### As a Dedicated Page
Navigate to `/contact` to see the full contact page with header and footer.

## Customization

### Updating Clinic Information
Edit the `clinicInfo` object in `ContactUs.tsx`:
```tsx
const clinicInfo = {
  name: "Your Clinic Name",
  address: "Your Address",
  phone: "Your Phone",
  email: "your@email.com",
  hours: {
    weekdays: "Your Weekday Hours",
    saturday: "Your Saturday Hours", 
    sunday: "Your Sunday Hours"
  }
};
```

### Updating Google Maps
Replace the `mapEmbedUrl` with your actual Google Maps embed URL:
```tsx
const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1dYOUR_COORDINATES!2dLONGITUDE!3dLATITUDE!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zYOUR_PLACE_ID!5e0!3m2!1sen!2sus!4vYOUR_TIMESTAMP!5m2!1sen!2sus";
```

### Form Submission
The form currently simulates submission. To connect to a real backend:
1. Replace the `handleSubmit` function
2. Add API endpoint integration
3. Add proper error handling
4. Consider adding reCAPTCHA for spam protection

## Responsive Breakpoints
- **Mobile**: Single column layout, stacked cards
- **Tablet**: Two column layout with adjusted spacing
- **Desktop**: Full two column layout with optimal spacing

## Accessibility
- Semantic HTML structure
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- High contrast color scheme

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes
