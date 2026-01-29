'use client';

/**
 * Ejemplo de uso de los servicios de API
 * Este componente demuestra cómo usar los servicios en la práctica
 */

import { useEffect, useState } from 'react';
import { publicationService, userService, mediaService, ApiError } from '@/lib/api';
import type { Publication, User } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function ExampleUsagePage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Cargar datos iniciales
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Cargar usuario y publicaciones en paralelo
      const [userData, publicationsData] = await Promise.all([
        userService.getCurrentUser(),
        publicationService.getPublications({ limit: 5 })
      ]);

      setUser(userData);
      setPublications(publicationsData);
    } catch (error) {
      if (error instanceof ApiError) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Crear nueva publicación
  const handleCreatePublication = async () => {
    try {
      const newPub = await publicationService.createPublication({
        title: 'Nueva publicación de prueba',
        content: 'Este es el contenido de la publicación',
        platform: 'instagram',
        status: 'draft'
      });

      toast({
        title: 'Éxito',
        description: 'Publicación creada correctamente'
      });

      // Actualizar lista
      setPublications([newPub, ...publications]);
    } catch (error) {
      if (error instanceof ApiError) {
        toast({
          title: 'Error',
          description: `No se pudo crear la publicación: ${error.message}`,
          variant: 'destructive'
        });
      }
    }
  };

  // Publicar inmediatamente
  const handlePublishNow = async (id: string) => {
    try {
      const published = await publicationService.publishNow(id);
      
      toast({
        title: 'Publicado',
        description: 'La publicación se ha publicado correctamente'
      });

      // Actualizar en la lista
      setPublications(publications.map(p => p.id === id ? published : p));
    } catch (error) {
      if (error instanceof ApiError) {
        toast({
          title: 'Error',
          description: `No se pudo publicar: ${error.message}`,
          variant: 'destructive'
        });
      }
    }
  };

  // Eliminar publicación
  const handleDelete = async (id: string) => {
    try {
      await publicationService.deletePublication(id);
      
      toast({
        title: 'Eliminado',
        description: 'La publicación se ha eliminado correctamente'
      });

      // Remover de la lista
      setPublications(publications.filter(p => p.id !== id));
    } catch (error) {
      if (error instanceof ApiError) {
        toast({
          title: 'Error',
          description: `No se pudo eliminar: ${error.message}`,
          variant: 'destructive'
        });
      }
    }
  };

  // Subir archivo
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      toast({
        title: 'Subiendo...',
        description: 'Subiendo archivo al servidor'
      });

      const media = await mediaService.uploadFile(file);
      
      toast({
        title: 'Éxito',
        description: `Archivo subido: ${media.filename}`
      });

      console.log('Media URL:', media.url);
    } catch (error) {
      if (error instanceof ApiError) {
        toast({
          title: 'Error',
          description: `No se pudo subir el archivo: ${error.message}`,
          variant: 'destructive'
        });
      }
    }
  };

  // Actualizar preferencias de usuario
  const handleUpdatePreferences = async () => {
    try {
      await userService.updatePreferences({
        theme: 'dark',
        notifications: {
          email: true,
          push: false
        }
      });

      toast({
        title: 'Preferencias actualizadas',
        description: 'Tus preferencias se han guardado correctamente'
      });

      // Recargar usuario
      const updatedUser = await userService.getCurrentUser();
      setUser(updatedUser);
    } catch (error) {
      if (error instanceof ApiError) {
        toast({
          title: 'Error',
          description: `No se pudieron actualizar las preferencias: ${error.message}`,
          variant: 'destructive'
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <p>Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Ejemplo de Uso de API Services</h1>
        <p className="text-muted-foreground">
          Esta página demuestra cómo usar los servicios de API en componentes
        </p>
      </div>

      {/* Información del usuario */}
      <Card>
        <CardHeader>
          <CardTitle>Usuario Actual</CardTitle>
          <CardDescription>Información del perfil</CardDescription>
        </CardHeader>
        <CardContent>
          {user ? (
            <div className="space-y-2">
              <p><strong>Nombre:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Rol:</strong> {user.role}</p>
              {user.preferences && (
                <p><strong>Tema:</strong> {user.preferences.theme}</p>
              )}
              <Button onClick={handleUpdatePreferences} size="sm">
                Cambiar a tema oscuro
              </Button>
            </div>
          ) : (
            <p>No hay información de usuario</p>
          )}
        </CardContent>
      </Card>

      {/* Publicaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Publicaciones</CardTitle>
          <CardDescription>Últimas 5 publicaciones</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleCreatePublication}>
            Crear Nueva Publicación
          </Button>

          <div className="space-y-3">
            {publications.length > 0 ? (
              publications.map((pub) => (
                <div
                  key={pub.id}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{pub.title}</h3>
                      <p className="text-sm text-muted-foreground">{pub.content}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-secondary rounded">
                          {pub.status}
                        </span>
                        <span className="text-xs px-2 py-1 bg-secondary rounded">
                          {pub.platform}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {pub.status === 'draft' && (
                        <Button
                          onClick={() => handlePublishNow(pub.id)}
                          size="sm"
                          variant="outline"
                        >
                          Publicar
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDelete(pub.id)}
                        size="sm"
                        variant="destructive"
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No hay publicaciones</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upload de archivos */}
      <Card>
        <CardHeader>
          <CardTitle>Subir Archivo</CardTitle>
          <CardDescription>Ejemplo de subida de medios</CardDescription>
        </CardHeader>
        <CardContent>
          <input
            type="file"
            onChange={handleFileUpload}
            accept="image/*"
            className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-primary file:text-primary-foreground
              hover:file:bg-primary/90
              cursor-pointer"
          />
        </CardContent>
      </Card>

      {/* Ejemplos de código */}
      <Card>
        <CardHeader>
          <CardTitle>Ejemplos de Código</CardTitle>
          <CardDescription>Cómo usar los servicios</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Usar servicios en componentes:</h4>
            <pre className="bg-secondary p-4 rounded-lg text-xs overflow-x-auto">
{`import { publicationService, userService } from '@/lib/api';

const MyComponent = () => {
  const loadData = async () => {
    const pubs = await publicationService.getPublications();
    const user = await userService.getCurrentUser();
  };
  
  return <div>...</div>;
};`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Crear publicación:</h4>
            <pre className="bg-secondary p-4 rounded-lg text-xs overflow-x-auto">
{`import { publicationService } from '@/lib/api';

const newPub = await publicationService.createPublication({
  title: 'Mi publicación',
  content: 'Contenido...',
  platform: 'instagram',
  status: 'draft'
});`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Manejo de errores:</h4>
            <pre className="bg-secondary p-4 rounded-lg text-xs overflow-x-auto">
{`import { ApiError } from '@/lib/api';

try {
  await publicationService.getPublicationById(id);
} catch (error) {
  if (error instanceof ApiError) {
    console.error('Status:', error.status);
    console.error('Message:', error.message);
  }
}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
