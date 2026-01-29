"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import MDEditor from '@uiw/react-md-editor';
import {
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";

export default function CreateButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [embed, setEmbed] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [address, setAddress] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    if (!category) {
      setError("Please select a category.");
      setLoading(false);
      return;
    }

    try {
      const aboutPage = {
        ...(phone && { phone }),
        ...(email && { email }),
        ...(facebook && { facebook }),
        ...(address && { address }),
      };

      const formData = new FormData();
      formData.append("category", category);
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("embed", embed);
      formData.append(
        "about_page",
        Object.keys(aboutPage).length > 0 ? JSON.stringify(aboutPage) : ""
      );

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`/api/destinations/${slug}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create destination");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      // Reset form
      setCategory("");
      setSlug("");
      setName("");
      setDescription("");
      setContent("");
      setEmbed("");
      setImage(null);
      setPhone("");
      setEmail("");
      setFacebook("");
      setAddress("");
      setOpen(false);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create New</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Destination</DialogTitle>
        </DialogHeader>
        <div className="px-5">
          <FieldGroup>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <FieldSet>
                <FieldLegend>Basic Information</FieldLegend>
                <FieldGroup className="flex flex-col gap-3">
                  <FieldLabel>Category *</FieldLabel>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nature">Nature</SelectItem>
                      <SelectItem value="resortandhotel">Resort and Hotel</SelectItem>
                      <SelectItem value="faith">Faith</SelectItem>
                      <SelectItem value="heritage">Heritage</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldGroup>
                <FieldGroup className="flex flex-col gap-3">
                  <FieldLabel>Name *</FieldLabel>
                  <Input id="name" value={name} onChange={(e) => {
                    setName(e.target.value);
                    setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, ''));
                  }} required />
                </FieldGroup>
                <FieldGroup className="flex flex-col gap-3">
                  <FieldLabel>Description *</FieldLabel>
                  <Textarea id="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                </FieldGroup>
                <FieldGroup className="flex flex-col gap-3">
                  <FieldLabel>Google Maps Link *</FieldLabel>
                  <Input id="embed" type="url" value={embed} onChange={(e) => setEmbed(e.target.value)} placeholder="https://www.google.com/maps/embed?..." required />
                </FieldGroup>
                <FieldGroup className="flex flex-col gap-3">
                  <FieldLabel>Image</FieldLabel>
                  <Input id="image" type="file" accept=".jpg" onChange={(e) => setImage(e.target.files?.[0] ?? null)} />
                </FieldGroup>
              </FieldSet>
              <FieldSeparator />
              <FieldSet>
                <FieldLegend>Content</FieldLegend>
                <div data-color-mode="light">
                  <div className="md:hidden flex flex-col gap-5">
                    <MDEditor value={content} onChange={(val) => setContent(val ?? "")} height="100%" preview="edit" />
                  </div>
                  <div className="hidden md:block">
                    <MDEditor value={content} onChange={(val) => setContent(val ?? "")} height="100%" preview="live" />
                  </div>
                </div>
              </FieldSet>
              <FieldSet>
                <FieldLegend>Contact Information</FieldLegend>
                <FieldGroup className="flex flex-col gap-3">
                  <FieldLabel>Phone</FieldLabel>
                  <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+63 000 000 0000" />
                </FieldGroup>
                <FieldGroup className="flex flex-col gap-3">
                  <FieldLabel>Email</FieldLabel>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="owner@example.com" />
                </FieldGroup>
                <FieldGroup className="flex flex-col gap-3">
                  <FieldLabel>Facebook</FieldLabel>
                  <Input id="facebook" value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="Facebook Page" />
                </FieldGroup>
                <FieldGroup className="flex flex-col gap-3">
                  <FieldLabel>Address</FieldLabel>
                  <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, Barangay, City" />
                </FieldGroup>
              </FieldSet>
              {error && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded mr-4">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="text-green-600 text-sm bg-green-50 p-3 rounded mr-4">
                    Destination created successfully!
                  </div>
                )}
               <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-gray-900" disabled={loading}>
                  {loading ? "Creating..." : "Create Destination"}
                </Button>
              </DialogFooter>
            </form>
          </FieldGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
}
