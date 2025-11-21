import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaLine } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { useToast } from "@/hooks/use-toast";

const Contact = () => {
    // const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (!formData.name || !formData.email || !formData.message) {
        //     toast({
        //         title: "Please fill all required fields",
        //         description: "Name, email, and message are required.",
        //         variant: "destructive",
        //     });
        //     return;
        // }

        // toast({
        //     title: "Message Sent!",
        //     description: "We'll get back to you as soon as possible.",
        // });

        setFormData({ name: "", email: "", phone: "", message: "" });
    };

    return (
        <>
            <div className="min-h-screen bg-matt text-white">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
                        CONTACT US
                    </h1>

                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">GET IN TOUCH</h2>
                            <p className="text-muted-foreground mb-8">
                                Have questions about our custom radiators? We're here to help.
                                Contact us and we'll respond as soon as possible.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-1">Phone</h3>
                                        <p className="text-muted-foreground">+66  081-313-5321 , 085-518-7650</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        {/* <Mail className="w-6 h-6 text-primary-foreground" /> */}
                                        <FaLine className="w-8 h-8 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-1">Line</h3>
                                        <p className="text-muted-foreground">
                                            081-313-5321
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                    <Link to="https://maps.app.goo.gl/MedRn3UuiywsGaj16" target="_blank" rel="noopener noreferrer">
                                        <div>
                                            <h3 className="font-bold mb-1">Address</h3>
                                            <p className="text-muted-foreground">
                                                918 หมู่ที่ 7 บางปูมินิแฟคเทครี่แลนด์ ถนน สุขุมวิท ต.บางปูใหม่
                                                <br />
                                                อ. เมืองสมุทรปราการ   จ. สมุทรปราการ  10280
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                                <iframe className="" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3879.0096541991693!2d100.62679817611551!3d13.53499888683461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d59d986c4eba3%3A0x2002af6a4b160d58!2z4Lia4Liy4LiH4Lib4Li54LmB4Lif4LiE4LiX4Lit4Lij4Li14LmI4LmB4Lil4LiZ4LiU4LmM!5e0!3m2!1sth!2sth!4v1763365891288!5m2!1sth!2sth" width="520" height="300" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="min-h-screen">
                            <h2 className="text-2xl font-bold mb-6">SEND US A MESSAGE</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Your Name *"
                                        className="w-full bg-light-matt border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        placeholder="Your Email *"
                                        className="w-full bg-light-matt border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        type="tel"
                                        placeholder="Your Phone"
                                        className="w-full bg-light-matt border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                    />
                                </div>

                                <div>
                                    <textarea
                                        placeholder="Your Message *"
                                        rows={6}
                                        className="w-full bg-light-matt border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({ ...formData, message: e.target.value })
                                        }
                                        required
                                    ></textarea>
                                </div>

                                <div className="p-2 w-full bg-red-600 h-full text-center rounded-md hover:scale-105 transition-transform text-white font-bold cursor-pointer" type="submit  duration-300">
                                    SEND MESSAGE
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
