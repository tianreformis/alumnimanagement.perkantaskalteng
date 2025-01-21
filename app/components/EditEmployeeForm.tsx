'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, X } from 'lucide-react'


interface Employee {
  id: string
  name: string
  email: string
  position?: 'ALUMNI' | 'SISWA' | 'MAHASISWA'
  image?: string
  kampus?: 'UNIVERSITAS_PALANGKA_RAYA' | 'UNIVERSITAS_TERBUKA_PALANGKA_RAYA' | 'UNIVERSITAS_KRISTEN_PALANGKA_RAYA' | 'UNIVERSITAS_MUHAMMADIYAH_PALANGKA_RAYA' | 'UNIVERSITAS_PGRI_PALANGKA_RAYA' | 'UNIVERSITAS_SIBER_ASIA_PALANGKA_RAYA' | 'IAIN_PALANGKA_RAYA' | 'IAKN_PALANGKA_RAYA' | 'IAHN_TAMPUNG_PENYANG_PALANGKA_RAYA' | 'ITSNU_KALIMANTAN' | 'STMIK_PALANGKA_RAYA' | 'STIH_TAMBUN_BUNGAI' | 'STIP_BUNGA_BANGSA' | 'STIE_PALANGKA_RAYA' | 'STIE_YBPK' | 'STIKES_EKA_HARAP' | 'STIPAS_TAHASAK_DANUM_PAMBELUM' | 'POLTEKKES_PALANGKA_RAYA' | 'AKBID_BETANG_ASI_RAYA' | 'OTHER' | ''
  otherKampus?: string
  jurusan?: string
  angkatan?: number | 0
  birthDay?: string
  pelayanan?: 'BPP' | 'SISWA' | 'MAHASISWA' | 'ALUMNI' | 'STAF_ADMIN' | 'STAF_SISWA' | 'STAF_SISWA_ASC' | 'STAF_MAHASISWA' | 'STAF_MAHASISWA_ASC' | 'OTHER' | ''
  otherPelayanan?: string

}

interface EditEmployeeFormProps {
  employee: Employee
  onClose: () => void
  onUpdate: (employee: Employee) => void
}

export default function EditEmployeeForm({ employee, onClose, onUpdate }: EditEmployeeFormProps) {
  const [name, setName] = useState(employee.name)
  const [email, setEmail] = useState(employee.email)
  const [position, setPosition] = useState<'ALUMNI' | 'SISWA' | 'MAHASISWA' | ''>(employee.position || '')
  const [image, setImage] = useState(employee.image || '')
  const [kampus, setKampus] = useState<'UNIVERSITAS_PALANGKA_RAYA' | 'UNIVERSITAS_TERBUKA_PALANGKA_RAYA' | 'UNIVERSITAS_KRISTEN_PALANGKA_RAYA' | 'UNIVERSITAS_MUHAMMADIYAH_PALANGKA_RAYA' | 'UNIVERSITAS_PGRI_PALANGKA_RAYA' | 'UNIVERSITAS_SIBER_ASIA_PALANGKA_RAYA' | 'IAIN_PALANGKA_RAYA' | 'IAKN_PALANGKA_RAYA' | 'IAHN_TAMPUNG_PENYANG_PALANGKA_RAYA' | 'ITSNU_KALIMANTAN' | 'STMIK_PALANGKA_RAYA' | 'STIH_TAMBUN_BUNGAI' | 'STIP_BUNGA_BANGSA' | 'STIE_PALANGKA_RAYA' | 'STIE_YBPK' | 'STIKES_EKA_HARAP' | 'STIPAS_TAHASAK_DANUM_PAMBELUM' | 'POLTEKKES_PALANGKA_RAYA' | 'AKBID_BETANG_ASI_RAYA' | 'OTHER' | ''>(employee.kampus || '')
  const [otherKampus, setOtherKampus] = useState(employee.otherKampus || '')
  const [jurusan, setJurusan] = useState(employee.jurusan || '')
  const [angkatan, setAngkatan] = useState(employee.angkatan || 0)
  const [birthDay, setBirthDay] = useState(employee.birthDay || '')
  const [pelayanan, setPelayanan] = useState<'BPP' | 'SISWA' | 'MAHASISWA' | 'ALUMNI' | 'STAF_ADMIN' | 'STAF_SISWA' | 'STAF_SISWA_ASC' | 'STAF_MAHASISWA' | 'STAF_MAHASISWA_ASC' | 'OTHER' | ''>(employee.pelayanan || '')
  const [otherPelayanan, setOtherPelayanan] = useState(employee.otherPelayanan || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`/api/employees/${employee.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        position: position || undefined,
        image: image || undefined,
        kampus: kampus || undefined,
        otherKampus: kampus === 'OTHER' ? otherKampus : undefined,
        jurusan: jurusan || undefined,
        angkatan,
        birthDay,
        pelayanan: pelayanan || undefined,
        otherPelayanan: pelayanan === 'OTHER' ? otherPelayanan : undefined,
      }),
    })
    if (response.ok) {
      const updatedEmployee = await response.json()
      onUpdate(updatedEmployee)
      onClose()
    } else {
      console.error('Failed to update Data')
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className='overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Edit Data</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-name">Nama Lengkap</Label>
            <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="edit-email">Email</Label>
            <Input id="edit-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="edit-position">Komponen</Label>
            <Select value={position} onValueChange={(value: 'ALUMNI' | 'SISWA' | 'MAHASISWA' | '') => setPosition(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="ALUMNI">Alumni</SelectItem>
                <SelectItem value="SISWA">Siswa</SelectItem>
                <SelectItem value="MAHASISWA">Mahasiswa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="edit-image">Image URL</Label>
            <Input id="edit-image" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>

          <div>
            <Label htmlFor="edit-kampus">Kampus</Label>
            <Select value={kampus} onValueChange={(value: 'UNIVERSITAS_PALANGKA_RAYA' | 'UNIVERSITAS_TERBUKA_PALANGKA_RAYA' | 'UNIVERSITAS_KRISTEN_PALANGKA_RAYA' | 'UNIVERSITAS_MUHAMMADIYAH_PALANGKA_RAYA' | 'UNIVERSITAS_PGRI_PALANGKA_RAYA' | 'UNIVERSITAS_SIBER_ASIA_PALANGKA_RAYA' | 'IAIN_PALANGKA_RAYA' | 'IAKN_PALANGKA_RAYA' | 'IAHN_TAMPUNG_PENYANG_PALANGKA_RAYA' | 'ITSNU_KALIMANTAN' | 'STMIK_PALANGKA_RAYA' | 'STIH_TAMBUN_BUNGAI' | 'STIP_BUNGA_BANGSA' | 'STIE_PALANGKA_RAYA' | 'STIE_YBPK' | 'STIKES_EKA_HARAP' | 'STIPAS_TAHASAK_DANUM_PAMBELUM' | 'POLTEKKES_PALANGKA_RAYA' | 'AKBID_BETANG_ASI_RAYA' | 'OTHER' | '') => setKampus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kampus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UNIVERSITAS_PALANGKA_RAYA">UNIVERSITAS_PALANGKA_RAYA</SelectItem>
                <SelectItem value="UNIVERSITAS_TERBUKA_PALANGKA_RAYA">UNIVERSITAS_TERBUKA_PALANGKA_RAYA</SelectItem>
                <SelectItem value="UNIVERSITAS_KRISTEN_PALANGKA_RAYA">UNIVERSITAS_KRISTEN_PALANGKA_RAYA</SelectItem>
                <SelectItem value="UNIVERSITAS_MUHAMMADIYAH_PALANGKA_RAYA">UNIVERSITAS_MUHAMMADIYAH_PALANGKA_RAYA</SelectItem>
                <SelectItem value="UNIVERSITAS_PGRI_PALANGKA_RAYA">UNIVERSITAS_PGRI_PALANGKA_RAYA</SelectItem>
                <SelectItem value="UNIVERSITAS_SIBER_ASIA_PALANGKA_RAYA">UNIVERSITAS_SIBER_ASIA_PALANGKA_RAYA</SelectItem>
                <SelectItem value="IAIN_PALANGKA_RAYA">IAIN_PALANGKA_RAYA</SelectItem>
                <SelectItem value="IAKN_PALANGKA_RAYA">IAKN_PALANGKA_RAYA</SelectItem>
                <SelectItem value="IAHN_TAMPUNG_PENYANG_PALANGKA_RAYA">IAHN_TAMPUNG_PENYANG_PALANGKA_RAYA</SelectItem>
                <SelectItem value="ITSNU_KALIMANTAN">ITSNU_KALIMANTAN</SelectItem>
                <SelectItem value="STMIK_PALANGKA_RAYA">STMIK_PALANGKA_RAYA</SelectItem>
                <SelectItem value="STIH_TAMBUN_BUNGAI">STIH_TAMBUN_BUNGAI</SelectItem>
                <SelectItem value="STIP_BUNGA_BANGSA">STIP_BUNGA_BANGSA</SelectItem>
                <SelectItem value="STIE_PALANGKA_RAYA">STIE_PALANGKA_RAYA</SelectItem>
                <SelectItem value="STIE_YBPK">STIE_YBPK</SelectItem>
                <SelectItem value="STIKES_EKA_HARAP">STIKES_EKA_HARAP</SelectItem>
                <SelectItem value="STIPAS_TAHASAK_DANUM_PAMBELUM">STIPAS_TAHASAK_DANUM_PAMBELUM</SelectItem>
                <SelectItem value="POLTEKKES_PALANGKA_RAYA">POLTEKKES_PALANGKA_RAYA</SelectItem>
                <SelectItem value="AKBID_BETANG_ASI_RAYA">AKBID_BETANG_ASI_RAYA</SelectItem>
                <SelectItem value="OTHER">OTHER</SelectItem>
                <SelectItem value=""> </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {kampus === 'OTHER' && (
            <div>
              <Label htmlFor="edit-otherKampus">Other Kampus</Label>
              <Input id="edit-otherKampus" value={otherKampus} onChange={(e) => setOtherKampus(e.target.value)} required />
            </div>
          )}


          <div>
            <Label htmlFor="edit-jurusan">Jurusan</Label>
            <Input id="edit-jurusan" value={jurusan} onChange={(e) => setJurusan(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="angkatan">Angkatan</Label>
            <Input id="angkatan" type="number" value={angkatan} onChange={(e) => setAngkatan(e.target.valueAsNumber)} required />
          </div>
          <div>

            <div>
              <Label htmlFor="edit-pelayanan">Pelayanan</Label>
              <Select value={pelayanan} onValueChange={(value: 'BPP' | 'SISWA' | 'MAHASISWA' | 'ALUMNI' | 'STAF_ADMIN' | 'STAF_SISWA' | 'STAF_SISWA_ASC' | 'STAF_MAHASISWA' | 'STAF_MAHASISWA_ASC' | 'OTHER' | '') => setPelayanan(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Pelayanan" />
                </SelectTrigger>
                <SelectContent>                  
                  <SelectItem value="SISWA">SISWA</SelectItem>
                  <SelectItem value="MAHASISWA">MAHASISWA</SelectItem>
                  <SelectItem value="ALUMNI">ALUMNI</SelectItem>
                  <SelectItem value="BPP">BPP</SelectItem>
                  <SelectItem value="STAF_ADMIN">STAF ADMIN</SelectItem>
                  <SelectItem value="STAF_SISWA">STAF SISWA</SelectItem>
                  <SelectItem value="STAF_SISWA_ASC">ASOSIATE STAF SISWA</SelectItem>
                  <SelectItem value="STAF_MAHASISWA_ASC">ASOSIATE STAF MAHASISWA</SelectItem>
                  <SelectItem value="STAF_MAHASISWA">STAF MAHASISWA</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {pelayanan === 'OTHER' && (
              <div>
                <Label htmlFor="edit-otherPelayanan">Pelayanan Lain</Label>
                <Input id="edit-otherPelayanan" value={otherPelayanan} onChange={(e) => setOtherPelayanan(e.target.value)} required />
              </div>
            )}

            <Label htmlFor="birthDay">Tanggal Lahir</Label>
            <Input id="birthDay" type="date" value={birthDay} onChange={(e) => setBirthDay(e.target.value)} required />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}><X size={20} />Cancel</Button>
            <Button type="submit"><Save size={20} />Simpan Perubahan</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}


