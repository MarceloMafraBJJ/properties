"use client";

import SectionDescription from "@/components/shared/section-description";
import SectionTitle from "@/components/shared/section-title";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideIcon, MapPin, Navigation, Phone, Watch } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const ContactItem = ({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) => (
  <div className="flex gap-4 items-center hover:bg-background/80 transition-all p-4 max-w-max rounded cursor-pointer">
    <Icon className="text-primary" />

    <div className="flex flex-col gap-1">
      <h1 className="font-bold">{title}</h1>
      <h2 className="font-light text-sm">{description}</h2>
    </div>
  </div>
);

const phoneRegex = new RegExp(
  /^(\+\d{1,2}\s?)?(\d{2,3}|\(\d{2,3}\))[-.\s]?\d{3,4}[-.\s]?\d{4}$/
);

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z.string().regex(phoneRegex, "Invalid Number!"),
  email: z.string().email(),
  message: z.string().min(25, {
    message: "Message must be at least 25 characters.",
  }),
});

const Contact = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section className="flex justify-center items-center bg-secondary">
      <div className="layout flex justify-center flex-col-reverse lg:flex-row gap-x-20 gap-y-10 py-10 w-full">
        <div className="flex-1 space-y-6 p-12 bg-background rounded-lg border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8 w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+55 48 99975-9801" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@gmail.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Hello! ...." {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Send Message</Button>
            </form>
          </Form>
        </div>

        <div className="flex-1 lg:pt-8 space-y-6">
          <SectionTitle>
            Get in touch to schedule a visit to your new house.
          </SectionTitle>

          <SectionDescription>
            Kindly fill this form with your details about your inquiries and we
            would respond your inquiry shortly.
          </SectionDescription>

          <div className="w-full h-[1px] bg-white/40" />

          <div className="flex flex-wrap gap-y-4">
            <ContactItem
              icon={Navigation}
              title="Send an email"
              description="contact@ecohavenrealty.com"
            />
            <ContactItem
              icon={Phone}
              title="Give us a call"
              description="+234905 121 8127"
            />
            <ContactItem
              icon={MapPin}
              title="Office address"
              description="11,Odo-Olowu, Ijeshatedo B/Stop, Surulere"
            />
            <ContactItem
              icon={Watch}
              title="Working hours"
              description="Mon - Sat: 10am - 4pm"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
