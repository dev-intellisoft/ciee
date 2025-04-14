using Microsoft.EntityFrameworkCore;
using ZooApi.Data;
using ZooApi.Models;

namespace ZooApi.Services
{
public class CareService
{
    private readonly ZooContext _context;

    public CareService(ZooContext context)
    {
        _context = context;
    }

    public async Task<List<Care>> GetAllCaresAsync()
    {
        return await _context.Cares.ToListAsync();
    }

    public async Task<Care> GetCareByIdAsync(int id)
    {
        return await _context.Cares.FindAsync(id);
    }

    public async Task<Care> AddCareAsync(Care care)
    {
        _context.Cares.Add(care);
        await _context.SaveChangesAsync();
        return care;
    }
    public async Task<Care> UpdateCareAsync(int id, Care updatedCare)
    {
        var existingCare = await _context.Cares.FindAsync(updatedCare.Id);
        if (existingCare == null)
        {
            return null;
        }
        existingCare.Name = updatedCare.Name;
        existingCare.Description = updatedCare.Description;
        existingCare.Frequency = updatedCare.Frequency;
        await _context.SaveChangesAsync();
        return existingCare;
    }

    public async Task<Care> DeleteCareAsync(int id)
    {
        var care = await _context.Cares.FindAsync(id);
        if (care == null)
        {
            return null;
        }
        _context.Cares.Remove(care);
        await _context.SaveChangesAsync();
        return care;
    }
}
}
