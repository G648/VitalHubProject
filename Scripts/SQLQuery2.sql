SELECT TOP (1000) [ID]
      ,[TipoUsuario]
  FROM [VitalHub_G16].[dbo].[TiposUsuario]

  INSERT INTO TiposUsuario values (NEWID(), 'Paciente'), (NEWID(), 'Medico')