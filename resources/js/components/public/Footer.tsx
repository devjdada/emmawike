import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Clock, Facebook, Instagram, LayoutDashboard, Linkedin, LogIn, Mail, MapPin, Phone, Twitter, User } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { props } = usePage();
    const { auth } = props;
    const user = auth ? auth.user : null;

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
    ];

    const quickLinks = [
        { name: 'Properties', href: '/properties' },
        { name: 'Projects', href: '/projects' },
        { name: 'Services', href: '/services' },
        { name: 'About Us', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ];

    const services = [
        'Luxury Home Sales',
        'Property Investment',
        'Market Analysis',
        'Property Management',
        'Commercial Real Estate',
        'Relocation Services',
    ];

    return (
        <footer className="bg-primary text-white">
            {/* Main Footer Content */}
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1"
                    >
                        <div className="mb-6 flex items-center space-x-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                                <span className="text-lg font-bold text-primary">EWP</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Emmo Wilke & Partners</h3>
                                <p className="text-sm text-white/80">Premium Real Estate</p>
                            </div>
                        </div>
                        <p className="mb-6 leading-relaxed text-white/80">
                            Your trusted partner in luxury real estate for over 25 years. We specialize in premium properties across California's most
                            desirable locations.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-accent hover:text-primary"
                                        aria-label={social.label}
                                    >
                                        <IconComponent className="h-5 w-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="mb-6 text-xl font-semibold">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-white/80 transition-colors hover:text-accent hover:underline">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <a
                                    href={'https://webmail.emmawike.com/'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/80 transition-colors hover:text-accent hover:underline"
                                >
                                    Webmail
                                </a>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="mb-6 text-xl font-semibold">Our Services</h3>
                        <ul className="space-y-3">
                            {services.map((service) => (
                                <li key={service}>
                                    <span className="text-white/80">{service}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="mb-6 text-xl font-semibold">Contact Us</h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                                <div>
                                    <p className="text-white/80">
                                        123 Luxury Avenue
                                        <br />
                                        Beverly Hills, CA 90210
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 flex-shrink-0 text-accent" />
                                <p className="text-white/80">(555) 123-4567</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 flex-shrink-0 text-accent" />
                                <p className="text-white/80">info@emmowilke.com</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                                <div>
                                    <p className="text-white/80">
                                        Mon - Fri: 9:00 AM - 7:00 PM
                                        <br />
                                        Sat - Sun: 10:00 AM - 5:00 PM
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                {user ? (
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center space-x-2 text-white/80 transition-colors hover:text-accent hover:underline"
                                    >
                                        <LayoutDashboard className="h-5 w-5 flex-shrink-0 text-accent" />
                                        <span>Dashboard</span>
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="flex items-center space-x-2 text-white/80 transition-colors hover:text-accent hover:underline"
                                        >
                                            <LogIn className="h-5 w-5 flex-shrink-0 text-accent" />
                                            <span>Login</span>
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="flex items-center space-x-2 text-white/80 transition-colors hover:text-accent hover:underline"
                                        >
                                            <User className="h-5 w-5 flex-shrink-0 text-accent" />
                                            <span>Register</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className="border-t border-white/20">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <div className="mb-4 text-sm text-white/80 md:mb-0">© {currentYear} Emmo Wilke & Partners. All rights reserved.</div>
                        <div className="flex space-x-6 text-sm">
                            <Link href="#" className="text-white/80 transition-colors hover:text-accent">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="text-white/80 transition-colors hover:text-accent">
                                Terms of Service
                            </Link>
                            <Link href="#" className="text-white/80 transition-colors hover:text-accent">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
